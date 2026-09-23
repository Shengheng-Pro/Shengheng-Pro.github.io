// Conceptual cross-section and filling sequence; shares the existing canvas coordinates.
function tissueSequence(ctx,step,elapsed,defect,drawMesh){
  const ease=v=>{v=Math.max(0,Math.min(1,v));return v*v*(3-2*v)};
  const label=(text,x,y)=>{ctx.fillStyle='#dcebe7';ctx.font='23px Arial';ctx.fillText(text,x,y)};
  if(step===3){
    const fill=ease((elapsed-500)/2800),cover=ease((elapsed-3700)/1800);
    ctx.save();ctx.clip(defect);
    for(let y=428;y<555;y+=12)for(let x=620;x<880;x+=12){const arrival=(x-620)/260*.7+(y-428)/127*.3;const a=ease((fill-arrival)*6);ctx.fillStyle='#edc36e';ctx.globalAlpha=a;ctx.beginPath();ctx.ellipse(x,y,7,5,0,0,Math.PI*2);ctx.fill()}
    ctx.restore();drawMesh(defect,14,0.85);
    const needleAlpha=1-ease((elapsed-3300)/500);
    ctx.save();ctx.globalAlpha=needleAlpha;ctx.translate(650+fill*190,475);ctx.rotate(-.7);
    ctx.strokeStyle='#d9e7ee';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(0,-95);ctx.stroke();
    ctx.fillStyle='rgba(213,231,237,.8)';ctx.fillRect(-12,-183,24,88);ctx.fillStyle='#edc36e';ctx.fillRect(-8,-174+fill*64,16,71-fill*64);
    ctx.strokeStyle='#b5cbd3';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(-24,-182);ctx.lineTo(24,-182);ctx.moveTo(0,-183);ctx.lineTo(0,-209+fill*50);ctx.stroke();ctx.restore();
    if(elapsed>3400){ctx.save();ctx.globalAlpha=ease((elapsed-3400)/450);ctx.translate(0,-180*(1-cover));const g=ctx.createLinearGradient(650,420,820,560);g.addColorStop(0,'#e8b89e');g.addColorStop(1,'#bc856d');ctx.fillStyle=g;ctx.fill(defect);ctx.strokeStyle='#edc7ae';ctx.lineWidth=3;ctx.stroke(defect);ctx.restore()}
    label(cover>.95?t('Cover layer in place','覆盖完成'):fill>.95?t('Cover the defect','覆盖缺损区域'):t('Fat filling within the SRM','向 SRM 孔隙内填充脂肪'),440,730);
  }else{
    const enter=ease(elapsed/1000),degrade=ease((elapsed-1600)/4800);
    ctx.save();ctx.globalAlpha=enter;ctx.translate(0,50*(1-enter));
    ctx.fillStyle='#081a27';ctx.fillRect(0,0,1536,1024);
    label(t('SIDE SECTION','侧面剖视'),205,260);
    // Cutaway: existing tissue at the sides, reconstructed volume in the centre.
    ctx.fillStyle='#855d50';ctx.fillRect(215,435,1100,225);
    ctx.fillStyle='#bd8c73';ctx.fillRect(215,413,230,70);ctx.fillRect(1090,413,225,70);
    ctx.fillStyle='#d6a085';ctx.fillRect(445,413,645,247);
    for(let row=0;row<4;row++)for(let col=0;col<13;col++){const x=470+col*47,y=453+row*48;const g=ctx.createRadialGradient(x-5,y-6,1,x,y,24);g.addColorStop(0,'#f7dda0');g.addColorStop(1,'#c8954d');ctx.fillStyle=g;ctx.beginPath();ctx.ellipse(x,y,22,20,0,0,Math.PI*2);ctx.fill()}
    ctx.save();ctx.globalAlpha=1-degrade;ctx.strokeStyle='#a1dcc8';ctx.lineWidth=9*(1-.6*degrade);ctx.lineCap='round';ctx.setLineDash(degrade>.25?[17*(1-degrade)+2,16*degrade]:[]);
    ctx.beginPath();for(let x=445;x<=1090;x+=47){ctx.moveTo(x,427);ctx.lineTo(x,645)}for(let y=429;y<=645;y+=48){ctx.moveTo(445,y);ctx.lineTo(1090,y)}ctx.stroke();ctx.restore();
    const skin=ctx.createLinearGradient(0,394,0,421);skin.addColorStop(0,'#efc5ae');skin.addColorStop(1,'#bd8c73');ctx.fillStyle=skin;ctx.fillRect(438,392,660,29);
    ctx.strokeStyle='#92aaa9';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(980,400);ctx.lineTo(1100,338);ctx.lineTo(1320,338);ctx.stroke();label(t('Cover layer','覆盖层'),1030,316);
    label(degrade>.95?t('Fat remains · SRM resorbed','脂肪保留 · SRM 降解'):t('Fat retained as the SRM degrades','SRM 逐渐降解，脂肪保留'),390,745);
    ctx.fillStyle='#2c4149';ctx.fillRect(445,799,645,4);ctx.fillStyle='#a1dcc8';ctx.fillRect(445,799,645*degrade,4);label(t('Over time','随时间推移'),650,850);ctx.restore();
  }
}
