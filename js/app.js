const canvas = document.getElementById('app');
const ctx = canvas.getContext('2d');
let currentScreen = 'menu';
let currentSet = [];
let currentIndex = 0;
let showTranslation = false;
let quiz = null;
let scenario = null;

function resize(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  draw();
}
window.addEventListener('resize', resize);
resize();

canvas.addEventListener('click', handleClick);

function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  if(currentScreen==='menu') drawMenu();
  else if(currentScreen==='flash') drawFlash();
  else if(currentScreen==='scenarioMenu') drawScenarioMenu();
  else if(currentScreen==='quiz') drawQuiz();
  else if(currentScreen==='progress') drawProgress();
}

function drawMenu(){
  const items=['Hangul Flashcards','Word Flashcards','Phrase Practice','Quiz','Progress'];
  items.forEach((t,i)=>{
    drawButton(canvas.width/2-150,100+i*80,300,60,t);
  });
}

function drawScenarioMenu(){
  const items=['introductions','restaurant','cafe','hotel'];
  items.forEach((t,i)=>{
    drawButton(canvas.width/2-150,100+i*80,300,60,t);
  });
}

function startFlash(set){
  currentSet=set;
  currentIndex=0;
  showTranslation=false;
  currentScreen='flash';
  recordProgress('flashcards');
  draw();
}

function drawFlash(){
  const item=currentSet[currentIndex];
  ctx.fillStyle='#000';
  ctx.textAlign='center';
  ctx.font='32px sans-serif';
  ctx.fillText(item.korean||item.char||item.phrase, canvas.width/2, canvas.height/2-40);
  if(showTranslation){
    ctx.font='20px sans-serif';
    ctx.fillText(item.roman||item.sound||item.meaning, canvas.width/2, canvas.height/2+10);
    if(item.english) ctx.fillText(item.english, canvas.width/2, canvas.height/2+40);
    if(item.reply){
      ctx.font='16px sans-serif';
      ctx.fillText('Reply: '+item.reply.join('/'), canvas.width/2, canvas.height/2+80);
      ctx.fillText('Ack: '+item.ack, canvas.width/2, canvas.height/2+100);
    }
  }
  drawButton(canvas.width/2-150,canvas.height-160,300,50,'Show/Hide');
  drawButton(canvas.width/2-150,canvas.height-100,300,50,'Next');
  drawButton(canvas.width/2-150,canvas.height-40,300,50,'Speak');
}

function startQuiz(){
  quiz = {score:0,question:0};
  currentScreen='quiz';
  nextQuestion();
}

function nextQuestion(){
  const q = EssentialWords[Math.floor(Math.random()*EssentialWords.length)];
  const options=[q.english];
  while(options.length<4){
    const opt=EssentialWords[Math.floor(Math.random()*EssentialWords.length)].english;
    if(!options.includes(opt)) options.push(opt);
  }
  options.sort(()=>Math.random()-0.5);
  quiz.current={q:q, options:options};
  quiz.question++;
  draw();
}

function drawQuiz(){
  ctx.fillStyle='#000';
  ctx.textAlign='center';
  ctx.font='32px sans-serif';
  ctx.fillText(quiz.current.q.korean, canvas.width/2, 120);
  quiz.current.options.forEach((opt,i)=>{
    drawButton(canvas.width/2-150,200+i*80,300,60,opt);
  });
  ctx.font='20px sans-serif';
  ctx.fillText('Score: '+quiz.score, canvas.width/2, canvas.height-40);
}

function drawProgress(){
  const data=JSON.parse(localStorage.getItem('progress')||'{}');
  const today=new Date().toISOString().slice(0,10);
  ctx.fillStyle='#000';
  ctx.textAlign='left';
  ctx.font='24px sans-serif';
  ctx.fillText('Today ('+today+')',20,40);
  const p=data[today]||{flashcards:0,quizzes:0};
  ctx.font='20px sans-serif';
  ctx.fillText('Flashcards: '+p.flashcards,20,80);
  ctx.fillText('Quizzes: '+p.quizzes,20,110);
  drawButton(canvas.width/2-150,canvas.height-60,300,50,'Back');
}

function drawButton(x,y,w,h,text){
  ctx.fillStyle='#e0e0e0';
  ctx.fillRect(x,y,w,h);
  ctx.strokeStyle='#999';
  ctx.strokeRect(x,y,w,h);
  ctx.fillStyle='#000';
  ctx.textAlign='center';
  ctx.textBaseline='middle';
  ctx.font='20px sans-serif';
  ctx.fillText(text,x+w/2,y+h/2);
}

function handleClick(evt){
  const x=evt.offsetX, y=evt.offsetY;
  if(currentScreen==='menu'){
    const opts=['Hangul Flashcards','Word Flashcards','Phrase Practice','Quiz','Progress'];
    opts.forEach((t,i)=>{
      if(inButton(x,y,canvas.width/2-150,100+i*80,300,60)){
        if(i===0) startFlash(HangulData.vowels.concat(HangulData.consonants).concat(HangulData.finals));
        else if(i===1) startFlash(EssentialWords);
        else if(i===2){currentScreen='scenarioMenu';draw();}
        else if(i===3){startQuiz();}
        else if(i===4){currentScreen='progress';draw();}
      }
    });
  }else if(currentScreen==='scenarioMenu'){
    const opts=['introductions','restaurant','cafe','hotel'];
    opts.forEach((t,i)=>{
      if(inButton(x,y,canvas.width/2-150,100+i*80,300,60)){
        scenario=t;
        startFlash(ScenarioSentences[t]);
      }
    });
  }else if(currentScreen==='flash'){
    if(inButton(x,y,canvas.width/2-150,canvas.height-160,300,50)){
      showTranslation=!showTranslation;draw();
    }else if(inButton(x,y,canvas.width/2-150,canvas.height-100,300,50)){
      currentIndex=(currentIndex+1)%currentSet.length;showTranslation=false;recordProgress('flashcards');draw();
    }else if(inButton(x,y,canvas.width/2-150,canvas.height-40,300,50)){
      const text=currentSet[currentIndex].korean||currentSet[currentIndex].char||currentSet[currentIndex].phrase;
      speechSynthesis.speak(new SpeechSynthesisUtterance(text));
    }
  }else if(currentScreen==='quiz'){
    quiz.current.options.forEach((opt,i)=>{
      if(inButton(x,y,canvas.width/2-150,200+i*80,300,60,opt)){
        if(opt===quiz.current.q.english) quiz.score++;
        recordProgress('quizzes');
        nextQuestion();
      }
    });
  }else if(currentScreen==='progress'){
    if(inButton(x,y,canvas.width/2-150,canvas.height-60,300,50)){
      currentScreen='menu';draw();
    }
  }
}

function inButton(x,y,bx,by,bw,bh){
  return x>bx && x<bx+bw && y>by && y<by+bh;
}

draw();
