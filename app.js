
const lessons=[
 {topic:"CHÀO HỎI",en:"Hello!",vi:"Xin chào!",pron:"hờ-lôu"},
 {topic:"CHÀO HỎI",en:"Good morning!",vi:"Chào buổi sáng!",pron:"gụt mo-ni-ng"},
 {topic:"GIA ĐÌNH",en:"I love you, Grandma.",vi:"Con yêu bà ngoại.",pron:"ai lâv diu, gran-ma"},
 {topic:"GIA ĐÌNH",en:"I am happy to see you.",vi:"Tôi rất vui được gặp bạn.",pron:"ai em he-pi tờ xi diu"},
 {topic:"SÂN BAY",en:"Where is my gate?",vi:"Cổng ra máy bay của tôi ở đâu?",pron:"que-rờ iz mai gâyt"},
 {topic:"SÂN BAY",en:"Where is my luggage?",vi:"Hành lý của tôi ở đâu?",pron:"que-rờ iz mai lâ-gịt"},
 {topic:"NHẬP CẢNH",en:"I am visiting my family.",vi:"Tôi sang thăm gia đình.",pron:"ai em vi-zi-ting mai fa-mi-li"},
 {topic:"NHẬP CẢNH",en:"I will stay for two weeks.",vi:"Tôi sẽ ở lại hai tuần.",pron:"ai wil stây pho tu quíks"},
 {topic:"XIN GIÚP ĐỠ",en:"Please speak slowly.",vi:"Xin hãy nói chậm.",pron:"pli-z spi-k s-lâu-li"},
 {topic:"XIN GIÚP ĐỠ",en:"Please call my family.",vi:"Xin hãy gọi cho gia đình tôi.",pron:"pli-z co-l mai fa-mi-li"}
];
const topics=[
 ["👋","Chào hỏi","Hello, Good morning"],
 ["✈️","Ở sân bay","Hộ chiếu, cổng bay, hành lý"],
 ["🛂","Nhập cảnh Mỹ","Thăm gia đình, thời gian lưu trú"],
 ["👧🏻","Nói với MinMin & MoMo","Ăn, chơi, ngủ, yêu thương"],
 ["🛒","Đi siêu thị","Hỏi giá và mua đồ"],
 ["🍽️","Nhà hàng","Gọi món và xin nước"],
 ["🏥","Sức khỏe","Nói mình không khỏe"],
 ["🆘","Khẩn cấp","Bị lạc và gọi gia đình"]
];
const helpPhrases=[
 ["📞","Please call my family.","Xin hãy gọi cho gia đình tôi."],
 ["🗣️","I don't speak English well.","Tôi nói tiếng Anh không tốt."],
 ["🐢","Please speak slowly.","Xin hãy nói chậm."],
 ["📍","I am lost.","Tôi bị lạc."],
 ["🏥","I need a doctor.","Tôi cần bác sĩ."],
 ["🧳","My luggage is missing.","Hành lý của tôi bị thất lạc."]
];
const praise=[
 {img:"minmin-v2/minmin-v2-02.png",vi:"Giỏi quá, Bà Ngoại!",en:"Great job, Grandma!"},
 {img:"momo/momo-02.png",vi:"Tuyệt lắm!",en:"Excellent!"},
 {img:"minmin-v2/minmin-v2-12.png",vi:"Bà Ngoại làm được rồi!",en:"You did it!"},
 {img:"momo/momo-14.png",vi:"Rất tốt!",en:"Very good!"},
 {img:"minmin-v2/minmin-v2-07.png",vi:"Chính xác!",en:"That's right!"},
 {img:"momo/momo-08.png",vi:"Hay lắm!",en:"Awesome!"},
 {img:"minmin-v2/minmin-v2-08.png",vi:"Bà Ngoại tiến bộ rồi đó!",en:"You're improving!"},
 {img:"momo/momo-15.png",vi:"MinMin và MoMo tự hào về Ngoại!",en:"We're proud of you, Grandma!"},
 {img:"minmin-v2/minmin-v2-09.png",vi:"Vỗ tay cho Bà Ngoại!",en:"Clap clap for Grandma!"},
 {img:"momo/momo-12.png",vi:"Bà Ngoại phát âm hay hơn rồi!",en:"Your pronunciation is better!"},
 {img:"minmin-v2/minmin-v2-14.png",vi:"Quá tuyệt luôn!",en:"Fantastic!"},
 {img:"momo/momo-03.png",vi:"Thêm một câu nữa nhé!",en:"One more sentence!"},
 {img:"minmin-v2/minmin-v2-03.png",vi:"Cố lên nào!",en:"Keep going!"},
 {img:"momo/momo-16.png",vi:"Bà Ngoại đang làm rất tốt!",en:"You're doing great!"},
 {img:"minmin-v2/minmin-v2-16.png",vi:"Bà Ngoại là siêu sao!",en:"You're a superstar!"}
];
const gentle=[
 {img:"momo/momo-05.png",vi:"Không sao đâu, Bà Ngoại.",en:"It's okay, Grandma."},
 {img:"minmin-v2/minmin-v2-15.png",vi:"Mình thử lại nhé!",en:"Let's try again!"},
 {img:"momo/momo-20.png",vi:"Chỉ còn một chút nữa thôi!",en:"Almost there!"},
 {img:"minmin-v2/minmin-v2-13.png",vi:"Đừng lo nha!",en:"Don't worry!"},
 {img:"momo/momo-03.png",vi:"Sai một chút cũng được.",en:"It's okay to make mistakes."},
 {img:"minmin-v2/minmin-v2-10.png",vi:"Mình cùng thử lại nhé!",en:"Let's try together!"},
 {img:"momo/momo-01.png",vi:"Chậm một chút cũng tốt.",en:"Slow is okay."},
 {img:"minmin-v2/minmin-v2-05.png",vi:"MoMo đang nghe Bà Ngoại đây.",en:"MoMo is listening, Grandma."},
 {img:"momo/momo-18.png",vi:"Bà Ngoại cứ từ từ nhé.",en:"Take your time."},
 {img:"minmin-v2/minmin-v2-06.png",vi:"Thử thêm một lần nữa nha!",en:"One more time!"},
 {img:"momo/momo-10.png",vi:"Bà Ngoại nói gần điện thoại hơn nhé.",en:"Please speak closer to the phone."},
 {img:"minmin-v2/minmin-v2-04.png",vi:"MinMin ở đây cùng Ngoại!",en:"MinMin is here with you!"},
 {img:"momo/momo-17.png",vi:"Ngoại đừng bỏ cuộc nhé!",en:"Don't give up!"},
 {img:"minmin-v2/minmin-v2-11.png",vi:"Chậm thôi là được.",en:"Slowly is perfect."},
 {img:"momo/momo-19.png",vi:"Ôm Bà Ngoại một cái nè!",en:"A big hug for Grandma!"}
];
const welcomeMessages=[
 ["Good morning, Grandma!","MinMin 🐰 và MoMo 🐷 học cùng Bà Ngoại nhé!"],
 ["Ready to learn, Grandma?","Hôm nay mình cùng học 10 câu nha!"],
 ["You can do it, Grandma!","Mỗi ngày một chút là giỏi lắm rồi!"],
 ["We love you, Grandma!","MinMin và MoMo luôn cổ vũ Bà Ngoại 💜"]
];
let idx=0,quizIdx=0,welIdx=0;
let flowers=Number(localStorage.getItem("ewgFlowers")||0);
let progress=Number(localStorage.getItem("ewgProgress")||0);
let streak=Number(localStorage.getItem("ewgStreak")||0);
let journal=JSON.parse(localStorage.getItem("ewgJournal")||"[]");
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const pick=a=>a[Math.floor(Math.random()*a.length)];

function go(id){$$(".screen").forEach(x=>x.classList.remove("active"));$("#"+id).classList.add("active");scrollTo({top:0,behavior:"smooth"});if(id==="garden")renderGarden()}
function speak(text,rate=.82){if(!speechSynthesis){alert("Thiết bị chưa hỗ trợ đọc giọng.");return}speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang="en-US";u.rate=rate;u.pitch=1.03;speechSynthesis.speak(u)}
function flowerRow(done,total=10){return Array.from({length:total},(_,i)=>`<span class="flower-dot ${i<done?"done":""}">${i<done?"🌷":"🌱"}</span>`).join("")}
function renderHome(){
 $("#flowerCount").textContent=flowers;
 $("#todayProgress").textContent=`${Math.min(progress,10)} / 10 câu`;
 $("#flowerProgress").innerHTML=flowerRow(Math.min(progress,10));
 $("#streakCount").textContent=streak;
}
function renderLesson(){
 const l=lessons[idx];
 $("#lessonCounter").textContent=`Câu ${idx+1} / ${lessons.length}`;
 $("#lessonTopic").textContent=l.topic;$("#lessonEn").textContent=l.en;$("#lessonPron").textContent=l.pron;$("#lessonVi").textContent=l.vi;
 $("#feedback").className="feedback hidden";
 $("#lessonFlowers").innerHTML=flowerRow(idx,10);
 $("#nextBtn").textContent=idx===lessons.length-1?"Hoàn thành bài 🌷":"Câu tiếp theo →";
 $("#lessonMascot").src=idx%2?"assets/stickers/momo/momo-12.png":"assets/stickers/minmin-v2/minmin-v2-14.png";
}
function showFeedback(ok,item=null){
 const s=item||pick(ok?praise:gentle);
 $("#feedbackSticker").src=`assets/stickers/${s.img}`;
 $("#feedbackVi").textContent=s.vi;$("#feedbackEn").textContent=s.en;
 $("#feedback").className=ok?"feedback":"feedback try";
}
function showCelebration(item){
 $("#celebrationImage").src=`assets/stickers/${item.img}`;
 $("#celebrationVi").textContent=item.vi;$("#celebrationEn").textContent=item.en;
 $("#celebration").classList.remove("hidden");
}
function recognize(){
 const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
 if(!SR){showFeedback(false,{img:"momo/momo-10.png",vi:"Safari chưa hỗ trợ chấm giọng trực tiếp. Bà Ngoại nghe rồi nói theo nhé.",en:"Listen and repeat, Grandma."});return}
 const r=new SR();r.lang="en-US";$("#speakStatus").textContent="Bà Ngoại nói ngay bây giờ nhé...";r.start();
 r.onresult=e=>{
   const said=e.results[0][0].transcript.toLowerCase();
   const target=lessons[idx].en.toLowerCase().replace(/[^\w\s']/g,"");
   const words=target.split(" ");
   const ok=words.filter(w=>said.includes(w)).length>=Math.max(1,words.length-1);
   showFeedback(ok);
 };
 r.onerror=()=>showFeedback(false,{img:"momo/momo-10.png",vi:"MoMo chưa nghe rõ. Bà Ngoại nói gần điện thoại hơn nhé.",en:"Please speak closer to the phone, Grandma."});
 r.onend=()=>$("#speakStatus").textContent="Bấm để nói lại";
}
function renderTopics(){$("#topicsList").innerHTML=topics.map((t,i)=>`<button class="list-item" data-topic="${i}"><span class="icon">${t[0]}</span><span><b>${t[1]}</b><small>${t[2]}</small></span><span class="arrow">›</span></button>`).join("")}
function renderHelp(){$("#helpList").innerHTML=helpPhrases.map((p,i)=>`<button class="list-item" data-help="${i}"><span class="icon">${p[0]}</span><span><b>${p[1]}</b><small>${p[2]}</small></span><span class="help-play">🔊</span></button>`).join("")}
function renderQuiz(){
 const q=lessons[quizIdx],wrong=lessons[(quizIdx+3)%lessons.length];
 const opts=Math.random()>.5?[q.vi,wrong.vi]:[wrong.vi,q.vi];
 $("#quizOptions").innerHTML=opts.map(x=>`<button class="quiz-option">${x}</button>`).join("");
 $("#quizFeedback").className="feedback hidden";
 $$(".quiz-option").forEach(b=>b.onclick=()=>{
   const ok=b.textContent===q.vi;
   $("#quizFeedback").className=ok?"feedback":"feedback try";
   $("#quizFeedback").textContent=ok?"Đúng rồi, Bà Ngoại! Tuyệt lắm 💜":"Gần đúng rồi. Bà Ngoại nghe lại nhé 🌷";
   if(ok)setTimeout(()=>{quizIdx=(quizIdx+1)%lessons.length;renderQuiz()},1100)
 });
}
function renderGarden(){
 const icons=["🌷","🪻","🌸","🌼","🌺","🦋","🐝"];
 $("#flowers").innerHTML=flowers?Array.from({length:Math.min(flowers,35)},(_,i)=>`<span>${icons[i%icons.length]}</span>`).join(""):"<span style='font-size:72px;opacity:.45'>🌱</span>";
 $("#gardenTitle").textContent=flowers?`Vườn của Ngoại đã có ${flowers} bông hoa!`:"Học xong một bài để hoa nở nhé!";
 $("#journalList").innerHTML=journal.length?journal.slice().reverse().map(j=>`<div class="journal-entry"><b>${j.icon} ${j.date}</b><small>${j.text}</small></div>`).join(""):"<div class='journal-entry'><small>Nhật ký đầu tiên sẽ xuất hiện sau khi Bà Ngoại hoàn thành bài học.</small></div>";
}
function finishLesson(){
 flowers++;streak=Math.max(1,streak+1);progress=10;
 localStorage.setItem("ewgFlowers",flowers);localStorage.setItem("ewgStreak",streak);localStorage.setItem("ewgProgress",progress);
 const date=new Date().toLocaleDateString("vi-VN");
 journal.push({icon:"🌷",date,text:"Hôm nay Ngoại đã học đủ 10 câu. MinMin và MoMo rất tự hào về Ngoại!"});
 journal=journal.slice(-30);localStorage.setItem("ewgJournal",JSON.stringify(journal));
 renderHome();showCelebration({img:"momo/momo-02.png",vi:"Bà Ngoại hoàn thành 10 câu rồi!",en:"You completed 10 sentences, Grandma!"});
}
$$("[data-go]").forEach(b=>b.onclick=()=>go(b.dataset.go));
$("#gardenShortcut").onclick=()=>go("garden");
$("#startToday").onclick=()=>{idx=0;progress=0;localStorage.setItem("ewgProgress",0);renderHome();renderLesson();go("lesson")};
$("#slowBtn").onclick=()=>speak(lessons[idx].en,.58);
$("#naturalBtn").onclick=()=>speak(lessons[idx].en,.9);
$("#speakBtn").onclick=recognize;
$("#nextBtn").onclick=()=>{
 progress=Math.min(10,idx+1);localStorage.setItem("ewgProgress",progress);renderHome();
 if(idx<lessons.length-1){showCelebration(pick(praise));idx++;renderLesson()}else finishLesson()
};
$("#quizPlay").onclick=()=>speak(lessons[quizIdx].en,.72);
$("#celebrationClose").onclick=()=>{$("#celebration").classList.add("hidden");if(progress===10&&idx===9)go("garden")};
$("#installHelp").onclick=()=>alert("Trên iPhone: mở trang bằng Safari → bấm Chia sẻ → chọn “Thêm vào Màn hình chính”.");
document.addEventListener("click",e=>{
 const t=e.target.closest("[data-topic]");if(t){idx=Math.min(Number(t.dataset.topic),lessons.length-1);renderLesson();go("lesson")}
 const h=e.target.closest("[data-help]");if(h)speak(helpPhrases[Number(h.dataset.help)][1],.7)
});
setInterval(()=>{welIdx=(welIdx+1)%welcomeMessages.length;$("#welcomeEnglish").textContent=welcomeMessages[welIdx][0];$("#welcomeVietnamese").textContent=welcomeMessages[welIdx][1]},5000);
renderHome();renderLesson();renderTopics();renderHelp();renderQuiz();renderGarden();
if("serviceWorker"in navigator)addEventListener("load",()=>navigator.serviceWorker.register("service-worker.js").catch(()=>{}));
