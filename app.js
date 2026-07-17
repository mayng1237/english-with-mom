let curriculum=[];
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const pick=a=>a[Math.floor(Math.random()*a.length)];
const state={
 day:Number(localStorage.getItem("ewgCurrentDay")||1),
 sentence:Number(localStorage.getItem("ewgSentenceIndex")||0),
 completed:Number(localStorage.getItem("ewgCompletedSentences")||0),
 sessions:Number(localStorage.getItem("ewgSessions")||0),
 favorites:JSON.parse(localStorage.getItem("ewgFavorites")||"[]"),
 journal:JSON.parse(localStorage.getItem("ewgJournal")||"[]"),
 lastStudy:localStorage.getItem("ewgLastStudy")||"",
 completedDays:JSON.parse(localStorage.getItem("ewgCompletedDays")||"[]")
};
let activeDay=state.day, idx=state.sentence, quizIdx=0, conversationIdx=0, recorder=null, chunks=[], waitingWorker=null;

const happyMinmin=[
"minmin-clean/minmin-happy-01.png","minmin-clean/minmin-happy-02.png",
"minmin-clean/minmin-happy-03.png","minmin-clean/minmin-happy-04.png",
"minmin-clean/minmin-happy-05.png","minmin-clean/minmin-happy-06.png",
"minmin-clean/minmin-happy-07.png","minmin-clean/minmin-happy-08.png",
"minmin-clean/minmin-happy-09.png","minmin-clean/minmin-happy-10.png",
"minmin-clean/minmin-happy-11.png","minmin-clean/minmin-happy-12.png",
"minmin-clean/minmin-happy-13.png","minmin-clean/minmin-happy-14.png",
"minmin-clean/minmin-happy-15.png"
];
const happyMomo=["momo/momo-02.png","momo/momo-08.png","momo/momo-12.png","momo/momo-14.png","momo/momo-16.png"];
const praise=[
 {speaker:"MinMin",img:"minmin-clean/minmin-happy-07.png",vi:"Bà Ngoại giỏi quá!",en:"Great job, Grandma!"},
 {speaker:"MoMo",img:"momo/momo-02.png",vi:"Tuyệt quá! Bà Ngoại nói tốt lắm!",en:"Excellent, Grandma!"},
 {speaker:"MinMin",img:"minmin-clean/minmin-happy-08.png",vi:"MinMin nghe rõ rồi! Chính xác đó Ngoại!",en:"I heard you clearly. That's right!"},
 {speaker:"MoMo",img:"momo/momo-14.png",vi:"MoMo tự hào về Bà Ngoại!",en:"I'm proud of you, Grandma!"},
 {speaker:"MinMin",img:"minmin-clean/minmin-happy-10.png",vi:"Hay lắm Ngoại ơi! Mình học tiếp nha!",en:"Awesome! Let's keep going!"},
 {speaker:"MoMo",img:"momo/momo-08.png",vi:"Yay! Thêm một câu nữa rồi!",en:"Yay! One more sentence!"}
];
const gentle=[
 {speaker:"MinMin",img:"minmin-clean/minmin-happy-02.png",vi:"Không sao đâu Ngoại. MinMin nghe lại cùng Ngoại nha!",en:"It's okay, Grandma. Let's try together!"},
 {speaker:"MoMo",img:"momo/momo-12.png",vi:"MoMo nghe gần đúng rồi đó! Ngoại thử thêm lần nữa nha!",en:"That was close! One more time, Grandma!"},
 {speaker:"MinMin",img:"minmin-clean/minmin-happy-12.png",vi:"MinMin ở đây với Ngoại nè. Mình nói chậm thôi nha!",en:"I'm here with you. Let's say it slowly!"},
 {speaker:"MoMo",img:"momo/momo-08.png",vi:"Ngoại cứ từ từ nha. MoMo đang lắng nghe!",en:"Take your time. I'm listening!"},
 {speaker:"MinMin",img:"minmin-clean/minmin-happy-06.png",vi:"Ngoại nói gần điện thoại hơn một chút nha!",en:"Please speak a little closer to the phone!"},
 {speaker:"MoMo",img:"momo/momo-14.png",vi:"Mình nghe lại một lần rồi thử tiếp nha Ngoại!",en:"Let's listen once more and try again!"}
];
const helpPhrases=[
 ["📞","Please call my family.","Xin hãy gọi cho gia đình tôi."],
 ["🗣️","I don't speak English well.","Tôi nói tiếng Anh không tốt."],
 ["🐢","Please speak slowly.","Xin hãy nói chậm."],
 ["📍","I am lost.","Tôi bị lạc."],
 ["🏥","I need a doctor.","Tôi cần bác sĩ."],
 ["🧳","My luggage is missing.","Hành lý của tôi bị thất lạc."]
];
const conversations=[
 {who:"MinMin",avatar:"minmin-clean/minmin-happy-01.png",prompt:"Hello, Grandma!",promptVi:"Con chào Bà Ngoại!",reply:"Hello, MinMin!",replyVi:"Chào MinMin!"},
 {who:"MoMo",avatar:"momo/momo-02.png",prompt:"How are you, Grandma?",promptVi:"Bà Ngoại khỏe không?",reply:"I'm good, thank you.",replyVi:"Bà khỏe, cảm ơn con."},
 {who:"MinMin",avatar:"minmin-clean/minmin-happy-06.png",prompt:"Do you want to play?",promptVi:"Bà Ngoại muốn chơi không?",reply:"Yes, let's play!",replyVi:"Có, mình cùng chơi nhé!"},
 {who:"MoMo",avatar:"momo/momo-14.png",prompt:"Are you hungry?",promptVi:"Bà Ngoại có đói không?",reply:"Yes, I am hungry.",replyVi:"Có, Bà Ngoại đói."},
 {who:"MinMin",avatar:"minmin-clean/minmin-happy-04.png",prompt:"I love you, Grandma!",promptVi:"Con yêu Bà Ngoại!",reply:"I love you too!",replyVi:"Bà cũng yêu con!"},
 {who:"MoMo",avatar:"momo/momo-08.png",prompt:"Let's take a photo!",promptVi:"Mình chụp hình nhé!",reply:"Okay, smile!",replyVi:"Được rồi, cười nào!"},
 {who:"MinMin",avatar:"minmin-clean/minmin-happy-07.png",prompt:"Tell me a story, Grandma.",promptVi:"Bà Ngoại kể chuyện cho con nhé.",reply:"Okay, come sit with me.",replyVi:"Được, con lại ngồi với Bà nhé."},
 {who:"MoMo",avatar:"momo/momo-16.png",prompt:"Good night, Grandma!",promptVi:"Chúc Bà Ngoại ngủ ngon!",reply:"Good night, sweetheart.",replyVi:"Chúc con yêu ngủ ngon."}
];

function save(){
 localStorage.setItem("ewgCurrentDay",state.day);
 localStorage.setItem("ewgSentenceIndex",state.sentence);
 localStorage.setItem("ewgCompletedSentences",state.completed);
 localStorage.setItem("ewgSessions",state.sessions);
 localStorage.setItem("ewgFavorites",JSON.stringify(state.favorites));
 localStorage.setItem("ewgJournal",JSON.stringify(state.journal.slice(-100)));
 localStorage.setItem("ewgLastStudy",state.lastStudy);
 localStorage.setItem("ewgCompletedDays",JSON.stringify(state.completedDays));
}
function dailyLessons(day=activeDay){return curriculum.filter(x=>x.day===day)}
function speak(text,rate=.82){if(!("speechSynthesis"in window)){alert("Thiết bị chưa hỗ trợ đọc giọng.");return}speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang="en-US";u.rate=rate;u.pitch=1.03;speechSynthesis.speak(u)}
function flowerRow(done,total=10){return Array.from({length:total},(_,i)=>`<span class="flower-dot ${i<done?"done":""}">${i<done?"🌷":"🌱"}</span>`).join("")}
function go(id){$$(".screen").forEach(x=>x.classList.remove("active"));$("#"+id).classList.add("active");scrollTo({top:0,behavior:"smooth"});if(id==="garden")renderGarden();if(id==="favorites")renderFavorites();if(id==="topics")renderTopics();if(id==="conversation")renderConversation()}
function daysSince(date){if(!date)return 999;const then=new Date(date+"T00:00:00"),now=new Date();now.setHours(0,0,0,0);return Math.floor((now-then)/86400000)}
function greeting(){
 const h=new Date().getHours(), gap=daysSince(state.lastStudy);
 let en,vi;
 if(gap>3&&state.completed>0){en="Welcome back, Grandma!";vi="MinMin và MoMo nhớ Bà Ngoại lắm 💜"}
 else if(h>=5&&h<12){en="Good morning, Grandma! ☀️";vi="Chúc Bà Ngoại một buổi sáng thật vui!"}
 else if(h>=12&&h<17){en="Good afternoon, Grandma! 🌼";vi="Mình cùng học một chút nhé Bà Ngoại!"}
 else if(h>=17&&h<23){en="Good evening, Grandma! 🌙";vi="MinMin và MoMo rất vui khi gặp Bà Ngoại!"}
 else{en="You're still awake, Grandma? 😄";vi="Học một chút rồi Bà Ngoại nghỉ ngơi nhé 💜"}
 $("#welcomeEnglish").textContent=en;$("#welcomeVietnamese").textContent=vi;
 $("#homeMinmin").src=`assets/stickers/${pick(happyMinmin)}`;$("#homeMomo").src=`assets/stickers/${pick(happyMomo)}`;
}
function renderHome(){
 greeting();
 const lessonDone=activeDay===state.day?state.sentence:0;
 $("#flowerCount").textContent=state.completed;
 $("#totalProgress").textContent=`${state.completed.toLocaleString("vi-VN")} / 1.000 câu`;
 $("#flowerProgress").innerHTML=flowerRow(Math.min(10,lessonDone),10);
 $("#streakCount").textContent=state.sessions;
 $("#dayBadge").textContent=`Bài ${state.day} / 100`;
 const lesson=dailyLessons(state.day)[0];
 $("#courseBadge").textContent=lesson?lesson.courseName:"Hành trình 1.000 câu";
 $("#favoriteCountHome").textContent=state.favorites.length?`${state.favorites.length} câu đã lưu`:"Chưa lưu câu nào";
 if(state.sentence>0&&state.sentence<10){
   $("#startTitle").textContent="Tiếp tục bài đang học";
   $("#startSubtitle").textContent=`Bài ${state.day} • tiếp tục từ câu ${state.sentence+1}`;
   $("#noteTitle").textContent="Ngoại không cần học lại từ đầu";
   $("#dailyMessage").textContent=`Lần trước Ngoại học đến câu ${state.sentence}. Mình tiếp tục câu ${state.sentence+1} nhé 💜`;
 }else{
   $("#startTitle").textContent="Bắt đầu bài học";
   $("#startSubtitle").textContent="10 câu • khoảng 10 phút";
   $("#noteTitle").textContent="Lời nhắn hôm nay";
   $("#dailyMessage").textContent="Mỗi câu Ngoại học là một bước gần MinMin và MoMo hơn. 💜";
 }
}
function renderLesson(){
 const lessons=dailyLessons(),l=lessons[idx];if(!l)return;
 $("#lessonCounter").textContent=`Bài ${activeDay} • Câu ${idx+1} / 10`;
 $("#lessonTopic").textContent=l.topic;$("#lessonEn").textContent=l.en;$("#lessonVi").textContent=l.vi;
 $("#feedback").className="feedback hidden";$("#speakStatus").textContent="Bấm vào rồi nói theo";
 $("#lessonFlowers").innerHTML=flowerRow(idx,10);
 $("#nextBtn").textContent=idx===9?"Hoàn thành bài học 🌷":"Câu tiếp theo →";
 $("#lessonMascot").src=`assets/stickers/${idx%2?pick(happyMomo):pick(happyMinmin)}`;
 const fav=state.favorites.includes(l.id);$("#favoriteBtn").textContent=fav?"★":"☆";$("#favoriteBtn").classList.toggle("active",fav);
 $("#recordedAudio").classList.add("hidden");$("#recordStatus").textContent="Nghe lại giọng của mình";
}
function showFeedback(ok,item=null){
 const s=item||pick(ok?praise:gentle);
 $("#feedbackSticker").src=`assets/stickers/${s.img}`;
 $("#feedbackSpeaker").textContent=`${s.speaker} nói:`;
 $("#feedbackVi").textContent=s.vi;
 $("#feedbackEn").textContent=s.en;
 $("#feedback").className=ok?"family-feedback":"family-feedback try";
}
function showCelebration(item){$("#celebrationImage").src=`assets/stickers/${item.img}`;$("#celebrationVi").textContent=item.vi;$("#celebrationEn").textContent=item.en;$("#celebration").classList.remove("hidden")}
function recognize(target,callback){
 const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
 if(!SR){callback(false,"Safari chưa hỗ trợ chấm giọng trực tiếp.");return}
 const r=new SR();r.lang="en-US";r.interimResults=false;r.maxAlternatives=1;r.start();
 r.onresult=e=>{const said=e.results[0][0].transcript.toLowerCase();const words=target.toLowerCase().replace(/[^\w\s']/g,"").split(/\s+/);const score=words.filter(w=>said.includes(w)).length/words.length;callback(score>=.7,said)};
 r.onerror=()=>callback(false,"");
}
function startRecognition(){
 const target=dailyLessons()[idx].en;$("#speakStatus").textContent="Bà Ngoại nói ngay bây giờ nhé...";
 recognize(target,(ok)=>{showFeedback(ok);$("#speakStatus").textContent="Bấm để nói lại"});
}
async function toggleRecord(){
 if(recorder&&recorder.state==="recording"){recorder.stop();return}
 if(!navigator.mediaDevices?.getUserMedia){alert("iPhone chưa cho phép thu âm.");return}
 try{
   const stream=await navigator.mediaDevices.getUserMedia({audio:true});
   chunks=[];recorder=new MediaRecorder(stream);
   recorder.ondataavailable=e=>chunks.push(e.data);
   recorder.onstop=()=>{const blob=new Blob(chunks,{type:recorder.mimeType});$("#recordedAudio").src=URL.createObjectURL(blob);$("#recordedAudio").classList.remove("hidden");$("#recordStatus").textContent="Bấm nút Play để nghe lại";stream.getTracks().forEach(t=>t.stop())};
   recorder.start();$("#recordStatus").textContent="Đang thu âm... Bấm lại để dừng";
 }catch(e){alert("Bà Ngoại hãy cho phép dùng microphone trong Safari nhé.")}
}
function toggleFavorite(){
 const l=dailyLessons()[idx],p=state.favorites.indexOf(l.id);
 if(p>=0)state.favorites.splice(p,1);else state.favorites.push(l.id);
 save();renderLesson();renderHome();
}
function finishLesson(){
 if(!state.completedDays.includes(activeDay)){
   state.completedDays.push(activeDay);state.completed=Math.min(1000,state.completed+10);state.sessions++;
   state.journal.push({date:new Date().toLocaleDateString("vi-VN"),text:`Ngoại đã hoàn thành Bài ${activeDay}: 10 câu tiếng Anh. MinMin và MoMo rất tự hào!`});
 }
 state.lastStudy=new Date().toISOString().slice(0,10);
 if(activeDay===state.day&&state.day<100){state.day++;state.sentence=0;activeDay=state.day;idx=0}
 else if(activeDay===100&&state.completed>=1000){state.sentence=10}
 save();renderHome();
 if(state.completed>=1000)$("#finalCelebration").classList.remove("hidden");
 else showCelebration({img:"momo/momo-02.png",vi:`Bà Ngoại hoàn thành Bài ${activeDay===state.day?activeDay-1:activeDay} rồi!`,en:"You completed the lesson, Grandma!"});
}
function nextLesson(){
 if(idx<9){
   idx++;
   if(activeDay===state.day){state.sentence=idx;state.lastStudy=new Date().toISOString().slice(0,10);save()}
   renderLesson();showCelebration(pick(praise));
 }else finishLesson();
}
function renderFavorites(){
 const list=state.favorites.map(id=>curriculum.find(x=>x.id===id)).filter(Boolean);
 $("#favoritesList").innerHTML=list.length?list.map(x=>`<div class="list-item"><span class="icon">⭐</span><span><b>${x.en}</b><small>${x.vi}</small></span><button class="help-play" data-fav-play="${x.id}">🔊</button><button class="help-play" data-fav-remove="${x.id}">★</button></div>`).join(""):`<div class="help-note">Ngoại chưa lưu câu nào. Trong bài học, bấm dấu ☆ để lưu câu mình thích.</div>`;
}
function renderTopics(){
 $("#topicsList").innerHTML=Array.from({length:100},(_,i)=>{
   const d=i+1,l=curriculum.find(x=>x.day===d),done=state.completedDays.includes(d),current=d===state.day;
   return `<button class="lesson-choice ${done?"done":""} ${current?"current":""}" data-day="${d}"><b>${done?"✓ ":""}Bài ${d}</b><small>${l?.courseName||""}<br>10 câu</small></button>`;
 }).join("");
}
function renderConversation(){
 const c=conversations[conversationIdx];$("#conversationAvatar").src=`assets/stickers/${c.avatar}`;$("#conversationSpeaker").textContent=`${c.who} nói:`;$("#conversationPrompt").textContent=c.prompt;$("#conversationPromptVi").textContent=c.promptVi;$("#conversationReply").textContent=c.reply;$("#conversationReplyVi").textContent=c.replyVi;$("#conversationFeedback").className="family-feedback hidden";
 setTimeout(()=>speak(c.prompt,.82),300);
}
function conversationSpeak(){
 const c=conversations[conversationIdx];
 recognize(c.reply,(ok)=>{
   const coach=c.who==="MinMin"?"MoMo":"MinMin";
   const avatar=coach==="MinMin"?pick(happyMinmin):pick(happyMomo);
   const msg=ok
     ? (coach==="MinMin"
        ? {main:"Tuyệt quá, Bà Ngoại!",sub:"MinMin nghe Ngoại nói rất rõ! 💜"}
        : {main:"Giỏi quá Ngoại ơi!",sub:"MoMo nghe thấy rồi! Mình nói câu tiếp theo nha! 🌷"})
     : (coach==="MinMin"
        ? {main:"Không sao đâu Ngoại.",sub:"MinMin nghe lại cùng Ngoại rồi mình thử thêm lần nữa nha! 💜"}
        : {main:"Gần đúng rồi đó Ngoại!",sub:"MoMo đang lắng nghe. Ngoại nói chậm thêm một chút nha! 🌷"});
   $("#conversationFeedbackAvatar").src=`assets/stickers/${avatar}`;
   $("#conversationFeedbackSpeaker").textContent=`${coach} nói:`;
   $("#conversationFeedbackMain").textContent=msg.main;
   $("#conversationFeedbackSub").textContent=msg.sub;
   $("#conversationFeedback").className=ok?"family-feedback":"family-feedback try";
 });
}
function renderHelp(){$("#helpList").innerHTML=helpPhrases.map((p,i)=>`<button class="list-item" data-help="${i}"><span class="icon">${p[0]}</span><span><b>${p[1]}</b><small>${p[2]}</small></span><span class="help-play">🔊</span></button>`).join("")}
function renderQuiz(){
 const lessons=dailyLessons(state.day),q=lessons[quizIdx],wrong=lessons[(quizIdx+3)%10],opts=Math.random()>.5?[q.vi,wrong.vi]:[wrong.vi,q.vi];
 $("#quizOptions").innerHTML=opts.map(x=>`<button class="quiz-option">${x}</button>`).join("");$("#quizFeedback").className="feedback hidden";
 $$(".quiz-option").forEach(b=>b.onclick=()=>{const ok=b.textContent===q.vi;$("#quizFeedback").className=ok?"feedback":"feedback try";$("#quizFeedback").textContent=ok?"Đúng rồi, Bà Ngoại! Tuyệt lắm 💜":"Gần đúng rồi. Bà Ngoại nghe lại nhé 🌷";if(ok)setTimeout(()=>{quizIdx=(quizIdx+1)%10;renderQuiz()},900)});
}
function renderGarden(){
 const n=state.completed,world=[];
 const flowerCount=Math.min(36,Math.floor(n/10));
 for(let i=0;i<flowerCount;i++)world.push(["🌷","🪻","🌸","🌼","🌺"][i%5]);
 if(n>=200)world.push("🐝");if(n>=400)world.push("🦋");if(n>=600)world.push("🌳");if(n>=800)world.push("🏡");if(n>=1000)world.push("🌈");
 $("#gardenWorld").innerHTML=world.length?world.map(x=>`<span>${x}</span>`).join(""):"<span style='font-size:75px;opacity:.5'>🌱</span>";
 $("#gardenTitle").textContent=n>=1000?"Khu vườn 1.000 câu đã nở rực rỡ!":`Ngoại đã hoàn thành ${n} / 1.000 câu`;
 $("#gardenSubtitle").textContent=n>=1000?"MinMin và MoMo rất tự hào về Bà Ngoại! 💜":"Mỗi 10 câu sẽ nở thêm một cụm hoa.";
 const ms=[[100,"🌷"],[200,"🐝"],[400,"🦋"],[600,"🌳"],[800,"🏡"],[1000,"🌈"]];
 $("#milestones").innerHTML=ms.map(([v,ic])=>`<div class="milestone ${n>=v?"done":""}"><span>${ic}</span><small>${v} câu</small></div>`).join("");
 $("#journalList").innerHTML=state.journal.length?state.journal.slice().reverse().map(j=>`<div class="journal-entry"><b>🌷 ${j.date}</b><small>${j.text}</small></div>`).join(""):"<div class='journal-entry'><small>Nhật ký đầu tiên sẽ xuất hiện sau khi Bà Ngoại hoàn thành một bài.</small></div>";
}
async function init(){
 curriculum=await fetch("data/curriculum-1000.json").then(r=>r.json());
 state.day=Math.min(100,Math.max(1,state.day));state.sentence=Math.min(9,Math.max(0,state.sentence));activeDay=state.day;idx=state.sentence;
 renderHome();renderLesson();renderHelp();renderQuiz();renderGarden();renderFavorites();renderTopics();setupSW();
}
$$("[data-go]").forEach(b=>b.onclick=()=>go(b.dataset.go));
$("#gardenShortcut").onclick=()=>go("garden");
$("#startToday").onclick=()=>{activeDay=state.day;idx=state.sentence;renderLesson();go("lesson")};
$("#slowBtn").onclick=()=>speak(dailyLessons()[idx].en,.58);$("#naturalBtn").onclick=()=>speak(dailyLessons()[idx].en,.9);$("#speakBtn").onclick=startRecognition;$("#recordBtn").onclick=toggleRecord;$("#favoriteBtn").onclick=toggleFavorite;$("#nextBtn").onclick=nextLesson;
$("#quizPlay").onclick=()=>speak(dailyLessons(state.day)[quizIdx].en,.72);
$("#conversationListen").onclick=()=>speak(conversations[conversationIdx].reply,.78);$("#conversationSpeak").onclick=conversationSpeak;$("#conversationNext").onclick=()=>{conversationIdx=(conversationIdx+1)%conversations.length;renderConversation()};
$("#celebrationClose").onclick=()=>$("#celebration").classList.add("hidden");
$("#finalClose").onclick=()=>{$("#finalCelebration").classList.add("hidden");go("garden")};
$("#installHelp").onclick=()=>alert("Trên iPhone: mở trang bằng Safari → bấm Chia sẻ → chọn “Thêm vào Màn hình chính”.");

document.addEventListener("click",e=>{
 const h=e.target.closest("[data-help]");if(h)speak(helpPhrases[Number(h.dataset.help)][1],.7);
 const d=e.target.closest("[data-day]");if(d){activeDay=Number(d.dataset.day);idx=activeDay===state.day?state.sentence:0;renderLesson();go("lesson")}
 const p=e.target.closest("[data-fav-play]");if(p){const x=curriculum.find(y=>y.id===Number(p.dataset.favPlay));if(x)speak(x.en,.75)}
 const r=e.target.closest("[data-fav-remove]");if(r){state.favorites=state.favorites.filter(x=>x!==Number(r.dataset.favRemove));save();renderFavorites();renderHome()}
});

function setupSW(){
 if(!("serviceWorker"in navigator))return;
 navigator.serviceWorker.register("service-worker.js").then(reg=>{
   if(reg.waiting){waitingWorker=reg.waiting;$("#updateBanner").classList.remove("hidden")}
   reg.addEventListener("updatefound",()=>{const nw=reg.installing;nw.addEventListener("statechange",()=>{if(nw.state==="installed"&&navigator.serviceWorker.controller){waitingWorker=nw;$("#updateBanner").classList.remove("hidden")}})});
 });
 navigator.serviceWorker.addEventListener("controllerchange",()=>location.reload());
 $("#updateNow").onclick=()=>waitingWorker?.postMessage({type:"SKIP_WAITING"});
}
init();
