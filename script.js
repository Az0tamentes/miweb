const text = document.getElementById("text");
const choices = document.getElementById("choices");
const startBtn = document.getElementById("start");
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// partículas de luz romántica
let particles = [];
for (let i = 0; i < 100; i++) {
    particles.push({
        x: Math.random()*canvas.width,
        y: Math.random()*canvas.height,
        radius: Math.random()*2+1,
        speedY: Math.random()*0.5+0.2,
        color: `rgba(255,182,193,${Math.random()})`
    });
}

function animateBG() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.radius,0,Math.PI*2);
        ctx.fillStyle = p.color;
        ctx.fill();
        p.y -= p.speedY;
        if (p.y < 0) p.y = canvas.height;
    });
    requestAnimationFrame(animateBG);
}
animateBG();

// ===== Inicio =====
startBtn.addEventListener("click", startGame);

function startGame() {
    startBtn.style.display = "none";

    showText("no es casualidad que estés aquí...");
    setTimeout(decision1, 2800);
}

function showText(msg, glitch=false) {
    text.classList.remove("glitch");
    if(glitch) text.classList.add("glitch");
    text.style.opacity = 0;
    setTimeout(()=>{ text.innerText = msg; text.style.opacity=1; },400);
}

function setChoices(options){
    choices.innerHTML = "";
    options.forEach(opt=>{
        const btn = document.createElement("button");
        btn.innerText = opt.text;
        btn.onclick = opt.action;
        choices.appendChild(btn);
    });
}

// ===== Historia =====
function decision1() {
    showText("podrías haber cerrado esto...");
    setChoices([
        {text:"pero sigo aquí", action:decision2},
        {text:"me puede la curiosidad", action:decision2}
    ]);
}

function decision2() {
    showText("entonces tengo que decirte algo...", true);
    setChoices([
        {text:"dímelo", action:decision3},
        {text:"me estás poniendo nerviosa", action:softPath}
    ]);
}

function softPath() {
    showText("tranquila... es algo bonito");
    setChoices([{text:"vale", action:decision3}]);
}

function decision3() {
    showText("no sé cuándo empezó...");
    setTimeout(()=>{ showText("pero contigo todo se siente diferente");},2500);
    setTimeout(decision4,5000);
}

function decision4() {
    setChoices([
        {text:"¿diferente cómo?", action:decision5},
        {text:"creo que ya lo sé...", action:romanticPath}
    ]);
}

function romanticPath() {
    showText("entonces quizás sientes lo mismo...");
    setTimeout(decision5,3000);
}

function decision5() {
    showText("cuando hablo contigo, me olvido de todo");
    setTimeout(()=>{ showText("y sinceramente... me haces feliz");},2500);
    setTimeout(decision6,5000);
}

function decision6() {
    setChoices([
        {text:"eso es muy bonito...", action:finalQuestion},
        {text:"yo también lo siento", action:specialEnding}
    ]);
}

function specialEnding() {
    showText("entonces no tengo dudas...");
    setTimeout(finalQuestion,2500);
}

// ===== Finales =====
function finalQuestion() {
    document.body.innerHTML=`
    <div style="text-align:center;">
        <h1>¿te gustaria ser algo más que amigos?</h1>
        <button onclick="yesEnding()">sí</button>
        <button onclick="maybeEnding()">de momento no...</button>
        <button onclick="noEnding()">pff nene lo siento</button>
    </div>`;
}

function yesEnding() {
    document.body.innerHTML=`
    <div style="text-align:center; animation: fadeIn 2s;">
        <h1>EL NUNCA DEJO DE CREER SIEMPRE TUVO FEEE</h1>
        <img src="foto.jpg" class="final-img">
        <p>te haré la niña más feliz del mundo</p>
    </div>`;
    createHearts();
}

function maybeEnding() {
    document.body.innerHTML=`
    <div style="text-align:center; animation: fadeIn 2s;">
        <h1>ok bro...</h1>
        <p>no pasa nada, lo importante es que sigamos compartiendo momentos</p>
        <p>quién sabe lo que puede pasar más adelante... ⏳</p>
    </div>`;
}

function noEnding() {
    document.body.innerHTML=`
    <div style="text-align:center; animation: fadeIn 2s;">
        <h1>entiendo...</h1>
        <p>gracias por haber llegado hasta aquí</p>
        <p>aún así, me alegro de habértelo dicho</p>
    </div>`;
}

// ===== Corazones finales =====
function createHearts() {
    setInterval(()=>{
        const heart=document.createElement("div");
        heart.innerHTML="💖";
        heart.style.position="fixed";
        heart.style.left=Math.random()*100+"vw";
        heart.style.bottom="0";
        heart.style.fontSize="20px";
        heart.style.animation="floatUp 3s linear";
        document.body.appendChild(heart);
        setTimeout(()=>heart.remove(),3000);
    },300);
}