# QWEN Topic Categorization

This project provides a simple command line tool to categorize text feedback such as comments, messages and reviews. It uses a zero-shot language model from the Transformers library to assign each text to a predefined topic and then reports the volume and share of each category.

## Requirements

- Python 3.11+
- `pandas`
- `transformers`

Install the dependencies with:

```bash
pip install pandas transformers
```

## Usage

Prepare a CSV file with a column containing the text you want to analyze (by default the column should be named `comment`). Then run:

```bash
python categorize.py feedback.csv --output labeled.csv
```

The tool will output a summary table showing the pain points (topics), their volume and their share of the total. The labeled comments will be saved to `labeled.csv`.

You can provide your own list of category labels by passing a text file via the `--categories` option. Each line of that file should contain one category label.

### Example

Sample data is provided in the `samples/` directory. To try the tool on the provided comments run:

```bash
python categorize.py samples/sample_comments.csv --categories samples/categories.txt
```

This will print a table summarizing the pain points and their share of the total.
