
const lessons=[
 {topic:"CHÀO HỎI",en:"Hello!",vi:"Xin chào!",pron:"hờ-lôu"},
 {topic:"GIA ĐÌNH",en:"I love you, Grandma.",vi:"Con yêu bà ngoại.",pron:"ai lâv diu, gran-ma"},
 {topic:"SÂN BAY",en:"Where is my gate?",vi:"Cổng ra máy bay của tôi ở đâu?",pron:"que-rờ iz mai gâyt"},
 {topic:"NHẬP CẢNH",en:"I am visiting my family.",vi:"Tôi sang thăm gia đình.",pron:"ai em vi-zi-ting mai fa-mi-li"},
 {topic:"XIN GIÚP ĐỠ",en:"Please speak slowly.",vi:"Xin hãy nói chậm.",pron:"pli-z spi-k s-lâu-li"}
];
const topics=[
 ["👋","Chào hỏi","Hello, How are you?"],
 ["✈️","Ở sân bay","Hộ chiếu, cổng bay, hành lý"],
 ["🛂","Nhập cảnh Mỹ","Thăm gia đình, nơi ở"],
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
const stickers=[
 ["minmin-1.png","Giỏi quá bà ngoại!","Great job, Grandma!"],
 ["momo-8.png","Bà làm được rồi!","You did it!"],
 ["minmin-3.png","Tuyệt vời!","Awesome!"],
 ["momo-3.png","Chính xác!","Perfect!"],
 ["minmin-4.png","Xuất sắc!","Excellent!"],
 ["momo-4.png","Không sao đâu.","It's okay."],
 ["minmin-5.png","Thử lại nhé!","Try again!"],
 ["momo-5.png","Chậm thôi cũng được.","Take your time."],
 ["minmin-6.png","Mình làm cùng nhau nhé!","Let's do it together!"],
 ["momo-6.png","Thêm một lần nữa!","One more time!"],
 ["minmin-7.png","Chào buổi sáng bà ngoại!","Good morning, Grandma!"],
 ["momo-7.png","Mình học nhé!","Let's learn!"],
 ["minmin-8.png","Nghe cùng MinMin nhé!","Listen with MinMin!"],
 ["momo-1.png","Bà nói thử nha!","Your turn!"],
 ["minmin-2.png","Xong rồi!","Finished!"],
 ["momo-2.png","Hôm nay bà giỏi lắm!","Amazing today!"],
 ["minmin-1.png","Tặng bà một bông hoa.","A flower for you."],
 ["momo-8.png","Vườn của bà nở thêm rồi!","Your garden is growing!"],
 ["minmin-6.png","MinMin và MoMo yêu bà ngoại.","We love you, Grandma!"],
 ["momo-3.png","Hẹn bà ngày mai nhé!","See you tomorrow!"]
];
let idx=0,quizIdx=0;
let flowers=Number(localStorage.getItem("ewmFlowers")||0);
let progress=Number(localStorage.getItem("ewmProgress")||0);
let streak=Number(localStorage.getItem("ewmStreak")||0);
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
function go(id){$$(".screen").forEach(x=>x.classList.remove("active"));$("#"+id).classList.add("active");scrollTo({top:0,behavior:"smooth"});if(id==="garden")renderGarden()}
function speak(text,rate=.82){if(!speechSynthesis){alert("Thiết bị chưa hỗ trợ đọc giọng.");return}speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang="en-US";u.rate=rate;u.pitch=1.03;speechSynthesis.speak(u)}
function renderHome(){$("#flowerCount").textContent=flowers;$("#todayProgress").textContent=`${Math.min(progress,5)} / 5 câu`;$("#progressBar").style.width=`${Math.min(progress,5)*20}%`;$("#streakCount").textContent=streak}
function renderLesson(){const l=lessons[idx];$("#lessonCounter").textContent=`Câu ${idx+1} / ${lessons.length}`;$("#lessonTopic").textContent=l.topic;$("#lessonEn").textContent=l.en;$("#lessonPron").textContent=l.pron;$("#lessonVi").textContent=l.vi;$("#feedback").className="feedback hidden";$("#nextBtn").textContent=idx===lessons.length-1?"Hoàn thành bài 🌷":"Câu tiếp theo →"}
function showSticker(success=true,forced=null){let pool=success?stickers.slice(0,5):stickers.slice(5,10);let s=forced||pool[Math.floor(Math.random()*pool.length)];let isMin=s[0].startsWith("minmin");$("#stickerImage").src=`assets/stickers/${s[0]}`;$("#stickerVi").textContent=s[1];$("#stickerEn").textContent=s[2];$("#stickerModal").classList.remove("hidden")}
function recognize(){const SR=window.SpeechRecognition||window.webkitSpeechRecognition;if(!SR){$("#feedback").className="feedback try";$("#feedback").textContent="Safari chưa hỗ trợ chấm giọng trực tiếp. Mẹ nghe rồi nói theo nhé 🌷";return}const r=new SR();r.lang="en-US";$("#speakStatus").textContent="Mẹ nói ngay bây giờ nhé...";r.start();r.onresult=e=>{let said=e.results[0][0].transcript.toLowerCase();let target=lessons[idx].en.toLowerCase().replace(/[^\w\s']/g,"");let ok=target.split(" ").filter(w=>said.includes(w)).length>=Math.max(1,target.split(" ").length-1);$("#feedback").className=ok?"feedback":"feedback try";$("#feedback").textContent=ok?"MinMin nghe thấy rồi! Bà nói rất gần 💜":`MoMo nghe được “${said}”. Mình thử chậm hơn nhé.`;showSticker(ok)};r.onerror=()=>{$("#feedback").className="feedback try";$("#feedback").textContent="MoMo chưa nghe rõ. Mẹ thử nói gần điện thoại hơn nhé.";showSticker(false)};r.onend=()=>$("#speakStatus").textContent="Bấm để nói lại"}
function renderTopics(){$("#topicsList").innerHTML=topics.map((t,i)=>`<button class="list-item" data-topic="${i}"><span class="icon">${t[0]}</span><span><b>${t[1]}</b><small>${t[2]}</small></span><span class="arrow">›</span></button>`).join("")}
function renderHelp(){$("#helpList").innerHTML=helpPhrases.map((p,i)=>`<button class="list-item" data-help="${i}"><span class="icon">${p[0]}</span><span><b>${p[1]}</b><small>${p[2]}</small></span><span class="help-play">🔊</span></button>`).join("")}
function renderQuiz(){const q=lessons[quizIdx],wrong=lessons[(quizIdx+1)%lessons.length];let opts=Math.random()>.5?[q.vi,wrong.vi]:[wrong.vi,q.vi];$("#quizOptions").innerHTML=opts.map(x=>`<button class="quiz-option">${x}</button>`).join("");$("#quizFeedback").className="feedback hidden";$$(".quiz-option").forEach(b=>b.onclick=()=>{let ok=b.textContent===q.vi;$("#quizFeedback").className=ok?"feedback":"feedback try";$("#quizFeedback").textContent=ok?"Đúng rồi bà ngoại! Tuyệt lắm 💜":"Gần đúng rồi. Mẹ nghe lại nhé 🌷";showSticker(ok);if(ok)setTimeout(()=>{quizIdx=(quizIdx+1)%lessons.length;renderQuiz()},1300)})}
function renderGarden(){const icons=["🌷","🪻","🌸","🌼","🌺","🦋"];$("#flowers").innerHTML=flowers?Array.from({length:Math.min(flowers,30)},(_,i)=>`<span>${icons[i%icons.length]}</span>`).join(""):"<span style='font-size:72px;opacity:.45'>🌱</span>";$("#gardenTitle").textContent=flowers?`Vườn của bà đã có ${flowers} bông hoa!`:"Học xong một bài để hoa nở nhé!"}
$$("[data-go]").forEach(b=>b.onclick=()=>go(b.dataset.go));
$("#gardenShortcut").onclick=()=>go("garden");
$("#startToday").onclick=()=>{idx=0;renderLesson();go("lesson")};
$("#slowBtn").onclick=()=>speak(lessons[idx].en,.58);
$("#naturalBtn").onclick=()=>speak(lessons[idx].en,.9);
$("#speakBtn").onclick=recognize;
$("#nextBtn").onclick=()=>{progress=Math.min(5,progress+1);localStorage.setItem("ewmProgress",progress);renderHome();if(idx<lessons.length-1){idx++;renderLesson();showSticker(true)}else{flowers++;streak=Math.max(1,streak+1);localStorage.setItem("ewmFlowers",flowers);localStorage.setItem("ewmStreak",streak);showSticker(true,stickers[16]);setTimeout(()=>go("garden"),500)}};
$("#quizPlay").onclick=()=>speak(lessons[quizIdx].en,.72);
$("#stickerClose").onclick=()=>$("#stickerModal").classList.add("hidden");
$("#installHelp").onclick=()=>alert("Trên iPhone: mở trang này bằng Safari → bấm nút Chia sẻ (hình vuông có mũi tên) → chọn “Thêm vào Màn hình chính”.");
document.addEventListener("click",e=>{let t=e.target.closest("[data-topic]");if(t){idx=Math.min(Number(t.dataset.topic),lessons.length-1);renderLesson();go("lesson")}let h=e.target.closest("[data-help]");if(h)speak(helpPhrases[Number(h.dataset.help)][1],.7)});
renderHome();renderLesson();renderTopics();renderHelp();renderQuiz();renderGarden();
if("serviceWorker"in navigator)addEventListener("load",()=>navigator.serviceWorker.register("service-worker.js").catch(()=>{}));
