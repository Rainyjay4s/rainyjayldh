// EmailJS 공개 설정값: Public Key만 브라우저 코드에 노출합니다.
const EMAILJS_PUBLIC_KEY = '2Wgda1WBpJFauNpSc';
const EMAILJS_SERVICE_ID = 'service_mv2eamg';
const EMAILJS_TEMPLATE_ID = 'template_bdsmecd'; // 접수 알림
const EMAILJS_AUTOREPLY_ID = 'template_2tgnyuh'; // 자동회신
const SITE_URL = 'https://rainyjayldh.vercel.app/';
const ORG_LOGO_URL = 'https://ai-homepage-prompt.vercel.app/logo.png';

const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
}), { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// 삭제·교체된 현장 사진 중 현재 폴더에 존재하는 사진만 사용합니다.
const gallerySources = ['KakaoTalk_20260630_011310265_02.jpg','KakaoTalk_20260630_011310265_03.jpg','KakaoTalk_20260630_011310265_04.jpg','KakaoTalk_20260709_212950712_10.jpg','KakaoTalk_20260709_212950712_03.jpg'];
document.querySelectorAll('.gallery-grid img').forEach((img, index) => { if (gallerySources[index]) img.src = gallerySources[index]; });

// 검색 결과와 SNS 공유에 필요한 메타·구조화 데이터를 공통으로 설정합니다.
document.title = '이동희 ㅣ Practical AI Education';
const meta = (name, content, property = false) => { let el = document.head.querySelector(`${property ? 'meta[property' : 'meta[name'}="${name}"]`); if (!el) { el = document.createElement('meta'); el.setAttribute(property ? 'property' : 'name', name); document.head.appendChild(el); } el.content = content; };
meta('description', 'AI를 배우는 순간, 업무의 결과가 달라집니다. 기업·공공기관을 위한 생성형 AI, 업무자동화, AI 콘텐츠 제작, 실시간 피드백 교육.');
meta('og:title', '이동희 ㅣ Practical AI Education', true); meta('og:description', '기업·공공기관을 위한 실무 중심 생성형 AI 교육', true); meta('og:url', SITE_URL, true); meta('og:image', ORG_LOGO_URL, true); meta('og:type', 'website', true);
let canonical = document.head.querySelector('link[rel="canonical"]'); if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical); } canonical.href = SITE_URL;
const personLd = { '@context':'https://schema.org', '@type':'Person', name:'이동희', jobTitle:'생성형 AI 실무교육 강사', url:SITE_URL, knowsAbout:['생성형AI강의','업무자동화','AI콘텐츠제작','실시간피드백'], sameAs:['https://blog.naver.com/rainyjay4s'] };
const ld = document.createElement('script'); ld.type = 'application/ld+json'; ld.textContent = JSON.stringify(personLd); document.head.appendChild(ld);

// 한국AI콘텐츠연구소 공통 헤더·푸터를 기존 레이아웃에 추가합니다.
const orgMarkup = `<a class="org-brand" href="https://hanconyeon.com/" target="_blank" rel="noopener"><img src="${ORG_LOGO_URL}" alt="한국AI콘텐츠연구소" onerror="this.style.display='none'"><span><strong>한국AI콘텐츠연구소</strong><small>KOREA AI CONTENTS LAB</small></span></a>`;
const header = document.querySelector('.site-header'); if (header && !header.querySelector('.org-brand')) { header.insertAdjacentHTML('afterbegin', orgMarkup); }
const footer = document.querySelector('.footer'); if (footer && !footer.querySelector('.org-footer')) { footer.insertAdjacentHTML('afterbegin', `<div class="org-footer">${orgMarkup}<span>© 2026 한국AI콘텐츠연구소</span></div>`); }

// 문의 폼은 기존 Final CTA 안에 추가하며, 기존 이메일·전화 연락처는 유지합니다.
const contact = document.querySelector('#contact .contact-inner');
if (contact && !document.querySelector('#emailjs-contact-form')) {
  const form = document.createElement('form'); form.id = 'emailjs-contact-form'; form.className = 'contact-form'; form.noValidate = true;
  form.innerHTML = `<div class="form-heading"><span>CONTACT FORM</span><h3>교육 문의를 남겨주세요.</h3></div>
    <label>이름 *<input name="from_name" required autocomplete="name"></label>
    <label>이메일 *<input name="from_email" type="email" required autocomplete="email"></label>
    <label>연락처<input name="phone" type="tel" autocomplete="tel"></label>
    <label>소속<input name="company" autocomplete="organization"></label>
    <label>문의 유형 *<select name="inquiry_type" required><option value="">선택해 주세요</option><option>기업·기관 교육</option><option>특강·워크숍</option><option>교육 협업</option><option>기타 문의</option></select></label>
    <label>문의 내용 *<textarea name="message" rows="5" required></textarea></label>
    <div class="privacy-row"><label class="privacy-label"><input id="privacy_agreed" name="privacy_agreed" type="checkbox" value="동의함" required><span>[필수] 개인정보 수집 · 이용에 동의합니다</span></label><button type="button" class="privacy-more">전문 보기</button></div>
    <div class="privacy-details" hidden><table><tbody><tr><th>수집 항목</th><td>이름, 이메일, 연락처, 소속</td></tr><tr><th>수집·이용 목적</th><td>문의 접수 및 답변 회신</td></tr><tr><th>보유·이용 기간</th><td>문의 처리 완료 후 1년 뒤 파기</td></tr><tr><th>동의 거부 권리</th><td>거부할 수 있으나 거부 시 문의 접수가 불가합니다</td></tr></tbody></table></div>
    <p class="form-status" aria-live="polite"></p><button class="form-submit btn light" type="submit" disabled>문의 보내기 ↗</button>`;
  contact.appendChild(form);
  const privacy = form.querySelector('#privacy_agreed'), submit = form.querySelector('.form-submit'), details = form.querySelector('.privacy-details');
  privacy.addEventListener('change', () => { submit.disabled = !privacy.checked; });
  form.querySelector('.privacy-more').addEventListener('click', () => { details.hidden = !details.hidden; });
  form.addEventListener('submit', async (event) => {
    event.preventDefault(); const status = form.querySelector('.form-status');
    if (!privacy.checked) { status.textContent = '개인정보 수집·이용에 동의해 주세요.'; return; }
    if (!form.reportValidity()) return;
    if (!window.emailjs) { status.textContent = '문의 시스템을 불러오는 중입니다. 잠시 후 다시 시도해 주세요.'; return; }
    submit.disabled = true; submit.textContent = '전송 중...'; status.textContent = '문의 내용을 전송하고 있습니다.';
    const now = new Date(); const params = Object.fromEntries(new FormData(form).entries()); params.to_email='arainge0215@gmail.com'; params.reply_to=params.from_email; params.submitted_at=now.toLocaleString('ko-KR',{dateStyle:'long',timeStyle:'short'}); params.agreed_at=now.toISOString(); params.page_url=window.location.href; params.privacy_agreed='동의함';
    try { await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params); await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_AUTOREPLY_ID, params); form.reset(); submit.disabled=true; submit.textContent='문의 보내기 ↗'; status.textContent='문의가 접수되었습니다. 확인 후 답변드리겠습니다.'; }
    catch (error) { submit.disabled=false; submit.textContent='문의 보내기 ↗'; status.textContent='전송에 실패했습니다. 이메일 또는 전화로 문의해 주세요.'; console.error(error); }
  });
}

const style = document.createElement('style'); style.textContent = `.org-brand{display:flex;align-items:center;gap:9px;padding:7px 10px;border-radius:3px;transition:background .25s}.org-brand:hover{background:#ebe9df}.org-brand img{height:24px;width:auto}.org-brand span{display:flex;flex-direction:column;line-height:1.1;white-space:nowrap}.org-brand strong{font-size:11px}.org-brand small{font:8px 'DM Sans',sans-serif;letter-spacing:.08em;color:#687178;margin-top:3px}.org-footer{grid-column:1/-1;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #dce2e2;padding-bottom:20px;margin-bottom:10px}.org-footer>span{font:11px 'DM Sans',sans-serif;color:#687178}.contact-form{background:#fff;color:#171b1d;padding:28px;display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:36px;max-width:630px}.contact-form .form-heading,.contact-form label:nth-of-type(5),.contact-form label:nth-of-type(6),.contact-form .privacy-row,.contact-form .privacy-details,.contact-form .form-status,.contact-form .form-submit{grid-column:1/-1}.form-heading span{font:700 10px 'DM Sans';letter-spacing:.15em;color:#f36f4b}.form-heading h3{font-size:21px;margin:8px 0 10px}.contact-form label{font-size:11px;font-weight:700}.contact-form input,.contact-form select,.contact-form textarea{display:block;width:100%;margin-top:7px;border:1px solid #dce2e2;background:#f5f7f5;padding:11px;font:13px 'Noto Sans KR';color:#171b1d}.contact-form textarea{resize:vertical}.privacy-row{display:flex;align-items:center;justify-content:space-between;gap:10px;font-size:11px}.privacy-label{display:flex!important;align-items:center;gap:8px}.privacy-label input{width:16px;height:16px;margin:0}.privacy-more{border:0;background:none;text-decoration:underline;color:#687178;font-size:11px}.privacy-details table{border-collapse:collapse;width:100%;font-size:11px}.privacy-details th,.privacy-details td{border-top:1px solid #dce2e2;padding:8px;text-align:left}.privacy-details th{width:30%;color:#687178}.form-status{min-height:20px;color:#f36f4b;font-size:12px}.form-submit:disabled{opacity:.45;cursor:not-allowed;transform:none;box-shadow:none}@media(max-width:800px){.site-header .org-brand{margin-right:auto}.org-footer{display:block}.org-footer .org-brand{margin-bottom:18px;padding-left:0}.contact-form{grid-template-columns:1fr;padding:22px}.contact-form .form-heading,.contact-form label:nth-of-type(5),.contact-form label:nth-of-type(6),.contact-form .privacy-row,.contact-form .privacy-details,.contact-form .form-status,.contact-form .form-submit{grid-column:auto}.org-brand strong{font-size:10px}}`; document.head.appendChild(style);

const emailjsScript = document.createElement('script'); emailjsScript.src='https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js'; emailjsScript.onload=()=>window.emailjs?.init({publicKey:EMAILJS_PUBLIC_KEY}); document.head.appendChild(emailjsScript);
const headerScroll=document.querySelector('.site-header'); window.addEventListener('scroll',()=>headerScroll?.classList.toggle('scrolled',window.scrollY>20),{passive:true});
const menu=document.querySelector('.menu-toggle'), nav=document.querySelector('.nav'); if(menu){menu.addEventListener('click',()=>{const open=!nav.classList.contains('open');nav.classList.toggle('open',open);nav.style.cssText=open?'display:flex;position:absolute;top:68px;left:0;right:0;padding:22px 16px;background:#f5f7f5;flex-direction:column;gap:18px;border-bottom:1px solid #dce2e2':' ';menu.textContent=open?'CLOSE':'MENU';});}
