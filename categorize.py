import argparse
import os
import pandas as pd

try:
    import openai
except ImportError:  # pragma: no cover - openai may not be installed during tests
    openai = None


def load_categories(path=None):
    if path:
        with open(path, 'r', encoding='utf-8') as f:
            labels = [line.strip() for line in f if line.strip()]
    else:
        labels = [
            "pricing issue",
            "product quality",
            "delivery delay",
            "customer service",
            "refund request",
        ]
    return labels


def _categorize_with_openai(text, labels):
    if not openai or not os.getenv("OPENAI_API_KEY"):
        return None
    prompt = (
        "Categorize the following customer feedback into one of the given labels:"
        f"\nLabels: {', '.join(labels)}\nFeedback: {text}\nLabel:"
    )
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
            temperature=0,
        )
        label = response.choices[0].message.content.strip()
        return label if label in labels else None
    except Exception:
        return None


def categorize_comments(df, text_column, labels):
    results = []
    for text in df[text_column].astype(str):
        label = _categorize_with_openai(text, labels)
        if label is None:
            # simple keyword-based fallback
            lowered = text.lower()
            if "price" in lowered or "expensive" in lowered:
                label = "pricing issue"
            elif "quality" in lowered or "defective" in lowered or "broke" in lowered:
                label = "product quality"
            elif "deliver" in lowered or "shipping" in lowered:
                label = "delivery delay"
            elif "service" in lowered or "support" in lowered:
                label = "customer service"
            elif "refund" in lowered or "return" in lowered:
                label = "refund request"
            else:
                label = labels[0]
        results.append(label)
    df['category'] = results
    return df


def summarize(df):
    counts = df['category'].value_counts().reset_index()
    counts.columns = ['category', 'volume']
    total = counts['volume'].sum()
    counts['share'] = counts['volume'] / total
    return counts


def main():
    parser = argparse.ArgumentParser(description="Categorize comments using a zero-shot model.")
    parser.add_argument('input', help='CSV file with a column of text.')
    parser.add_argument('--column', default='comment', help='Name of the text column (default: comment)')
    parser.add_argument('--categories', help='Path to a text file with one category per line.')
    parser.add_argument('--output', help='Where to save the categorized CSV.')

    args = parser.parse_args()

    labels = load_categories(args.categories)
    df = pd.read_csv(args.input)
    if args.column not in df.columns:
        raise ValueError(f"Column '{args.column}' not found in input file")
    df = categorize_comments(df, args.column, labels)
    summary = summarize(df)

    print("Summary of pain points:")
    print(summary)

    if args.output:
        df.to_csv(args.output, index=False)


if __name__ == "__main__":
    main()
