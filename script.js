let defaultLinks = [
    { title: "GitHub Portfolio", url: "https://github.com/johndoe", icon: "github", clicks: 120 },
    { title: "Personal Website", url: "https://johndoe.design", icon: "globe", clicks: 85 },
    { title: "Twitter Feed", url: "https://twitter.com/johndoe", icon: "twitter", clicks: 230 }
];

function initLinksBuilder() {
    const container = document.getElementById('links-container');
    if (!container) return;
    container.innerHTML = '';
    
    defaultLinks.forEach(link => {
        addLinkRow(link.title, link.url, link.icon, link.clicks);
    });
    
    updatePhonePreview();
}

function addLinkRow(title = "", url = "", icon = "globe", clicks = 0) {
    const container = document.getElementById('links-container');
    if (!container) return;
    
    const row = document.createElement('div');
    row.className = 'link-build-row';
    row.innerHTML = `
        <span class="delete-link-btn" onclick="removeLinkBlock(this)">✖ Remove</span>
        <div style="display: flex; flex-direction: column; gap: 0.8rem; margin-top: 0.5rem;">
            <div class="input-field">
                <label>Link Title</label>
                <input type="text" class="link-input-title" value="${title}" placeholder="e.g. My Website" oninput="updatePhonePreview()">
            </div>
            <div class="input-field">
                <label>Target URL</label>
                <input type="text" class="link-input-url" value="${url}" placeholder="e.g. https://domain.com" oninput="updatePhonePreview()">
            </div>
            <div class="input-field">
                <label>Link Icon Accent</label>
                <select class="link-input-icon" onchange="updatePhonePreview()">
                    <option value="globe" ${icon === 'globe' ? 'selected' : ''}>🌐 Globe / Website</option>
                    <option value="github" ${icon === 'github' ? 'selected' : ''}>🐙 GitHub Portfolio</option>
                    <option value="twitter" ${icon === 'twitter' ? 'selected' : ''}>🐦 Twitter / X</option>
                    <option value="linkedin" ${icon === 'linkedin' ? 'selected' : ''}>💼 LinkedIn Profile</option>
                    <option value="instagram" ${icon === 'instagram' ? 'selected' : ''}>📸 Instagram / Media</option>
                    <option value="youtube" ${icon === 'youtube' ? 'selected' : ''}>📺 YouTube Channel</option>
                </select>
            </div>
            <input type="hidden" class="link-input-clicks" value="${clicks}">
        </div>
    `;
    
    container.appendChild(row);
    updatePhonePreview();
}

function removeLinkBlock(btn) {
    const row = btn.closest('.link-build-row');
    if (row) {
        row.remove();
        updatePhonePreview();
    }
}

function updatePhonePreview() {
    const nameEl = document.getElementById('bio-name');
    const taglineEl = document.getElementById('bio-tagline');
    const themeEl = document.getElementById('bio-theme');
    
    const name = nameEl ? (nameEl.value || 'Jane Doe') : 'Jane Doe';
    const tagline = taglineEl ? (taglineEl.value || 'Digital Creator') : 'Digital Creator';
    const theme = themeEl ? (themeEl.value || 'cyber') : 'cyber';
    
    const phoneScreen = document.getElementById('preview-phone-screen');
    if (!phoneScreen) return;
    
    let themeBgClass = "";
    let linkStyleClass = "";
    
    if (theme === 'cyber') {
        themeBgClass = "linear-gradient(135deg, #090b0e, #161a25, #0f2b48)";
        linkStyleClass = "background: rgba(255,255,255,0.03); border: 1px solid rgba(102, 252, 241, 0.3); color: #fff; box-shadow: 0 0 10px rgba(102, 252, 241, 0.1);";
    } else if (theme === 'walnut') {
        themeBgClass = "linear-gradient(135deg, #110e08, #2a2115)";
        linkStyleClass = "background: linear-gradient(90deg, #d4af37, #aa7c11); border: none; color: #fff; text-shadow: 0 1px 2px rgba(0,0,0,0.3);";
    } else if (theme === 'sunset') {
        themeBgClass = "linear-gradient(135deg, #ff7e5f, #feb47b, #764ba2)";
        linkStyleClass = "background: rgba(255, 255, 255, 0.15); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.25); color: #fff;";
    } else if (theme === 'emerald') {
        themeBgClass = "linear-gradient(135deg, #0a1f1d, #143d39)";
        linkStyleClass = "background: #2ecc71; border: 1px solid #27ae60; color: #fff;";
    } else if (theme === 'royal') {
        themeBgClass = "linear-gradient(135deg, #2b1055, #7597de)";
        linkStyleClass = "background: linear-gradient(135deg, #8e2de2, #4a00e0); border: 1px solid rgba(255,255,255,0.1); color: #fff;";
    }
    
    phoneScreen.style.background = themeBgClass;
    
    const linkRows = document.querySelectorAll('.link-build-row');
    let linksHtml = "";
    
    linkRows.forEach((row, index) => {
        const titleInput = row.querySelector('.link-input-title');
        const urlInput = row.querySelector('.link-input-url');
        const iconSelect = row.querySelector('.link-input-icon');
        
        const title = titleInput ? (titleInput.value.trim() || 'Social Link') : 'Social Link';
        const url = urlInput ? (urlInput.value.trim() || '#') : '#';
        const iconType = iconSelect ? iconSelect.value : 'globe';
        
        let iconMarkup = "🌐";
        if (iconType === 'github') iconMarkup = "🐙";
        else if (iconType === 'twitter') iconMarkup = "🐦";
        else if (iconType === 'linkedin') iconMarkup = "💼";
        else if (iconType === 'instagram') iconMarkup = "📸";
        else if (iconType === 'youtube') iconMarkup = "📺";
        
        linksHtml += `
            <a href="#" onclick="event.preventDefault(); triggerPhoneLinkClick(${index})" style="display: flex; align-items: center; justify-content: center; gap: 0.8rem; width: 100%; padding: 0.9rem; border-radius: 12px; text-decoration: none; font-weight: 700; font-family: 'Space Grotesk', sans-serif; font-size: 0.95rem; margin-bottom: 1rem; transition: all 0.2s ease; ${linkStyleClass}">
                <span>${iconMarkup}</span>
                <span>${title}</span>
            </a>
        `;
    });
    
    phoneScreen.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; text-align: center; padding: 2.5rem 1.5rem; width: 100%; height: 100%; overflow-y: auto;">
            <div style="width: 75px; height: 75px; border-radius: 50%; background: linear-gradient(45deg, var(--primary), var(--primary-dark)); margin-bottom: 1.2rem; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; font-weight: 800; border: 3px solid rgba(255,255,255,0.15); box-shadow: 0 10px 20px rgba(0,0,0,0.15); color: #fff;">
                ${name.charAt(0).toUpperCase()}
            </div>
            
            <h3 style="font-family: 'Space Grotesk', sans-serif; font-size: 1.3rem; font-weight: 700; color: #fff; margin-bottom: 0.3rem; letter-spacing: -0.5px;">${name}</h3>
            <p style="font-size: 0.85rem; color: rgba(255,255,255,0.7); margin-bottom: 2rem; max-width: 90%; line-height: 1.4;">${tagline}</p>
            
            <div style="width: 100%; display: flex; flex-direction: column; margin-top: 0.5rem;">
                ${linksHtml || '<p style="color: rgba(255,255,255,0.4); font-size: 0.85rem; margin-top: 2rem;">No links registered yet.</p>'}
            </div>
            
            <div style="margin-top: auto; font-size: 0.65rem; color: rgba(255,255,255,0.4); font-weight: 700; letter-spacing: 1px; text-transform: uppercase; padding-top: 1.5rem;">
                ⚡ Powered by LinkSphere
            </div>
        </div>
    `;
}

function getUtmMediumValue() {
    const utmMediumEl = document.getElementById('utm-medium');
    if (!utmMediumEl) return '';
    
    if (utmMediumEl.value === 'custom') {
        const customEl = document.getElementById('utm-medium-custom');
        return customEl ? customEl.value.trim() : '';
    }
    return utmMediumEl.value;
}

function triggerPhoneLinkClick(index) {
    const linkRows = document.querySelectorAll('.link-build-row');
    if (index >= linkRows.length) return;
    
    const row = linkRows[index];
    const titleInput = row.querySelector('.link-input-title');
    const urlInput = row.querySelector('.link-input-url');
    const clicksInput = row.querySelector('.link-input-clicks');
    
    const title = titleInput ? titleInput.value.trim() : 'Social Link';
    let url = urlInput ? urlInput.value.trim() : '#';
    
    let clicksVal = clicksInput ? (parseInt(clicksInput.value) || 0) : 0;
    clicksVal++;
    if (clicksInput) clicksInput.value = clicksVal;
    
    const utmSourceEl = document.getElementById('utm-source');
    const utmCampaignEl = document.getElementById('utm-campaign');
    
    const utmSource = utmSourceEl ? utmSourceEl.value.trim() : '';
    const utmMedium = getUtmMediumValue();
    const utmCampaign = utmCampaignEl ? utmCampaignEl.value.trim() : '';
    
    if (utmSource || utmMedium || utmCampaign) {
        const separator = url.includes('?') ? '&' : '?';
        const params = [];
        if (utmSource) params.push(`utm_source=${encodeURIComponent(utmSource)}`);
        if (utmMedium) params.push(`utm_medium=${encodeURIComponent(utmMedium)}`);
        if (utmCampaign) params.push(`utm_campaign=${encodeURIComponent(utmCampaign)}`);
        url += separator + params.join('&');
    }
    
    const item = {
        title: title,
        url: url,
        clicks: clicksVal
    };
    
    showSessionInterstitialAd(() => {
        openDetail(item, index);
    });
}

function drawPremiumQRCode(canvasId, text) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const size = canvas.width;
    
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, size, size);
    
    ctx.fillStyle = '#10131b';
    ctx.fillRect(15, 15, 45, 45);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(21, 21, 33, 33);
    ctx.fillStyle = '#3d5afe';
    ctx.fillRect(27, 27, 21, 21);
    
    ctx.fillStyle = '#10131b';
    ctx.fillRect(size - 60, 15, 45, 45);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(size - 54, 21, 33, 33);
    ctx.fillStyle = '#3d5afe';
    ctx.fillRect(size - 48, 27, 21, 21);
    
    ctx.fillStyle = '#10131b';
    ctx.fillRect(15, size - 60, 45, 45);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(21, size - 54, 33, 33);
    ctx.fillStyle = '#3d5afe';
    ctx.fillRect(27, size - 48, 21, 21);
    
    ctx.fillStyle = '#10131b';
    const cellSize = 6;
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
        hash = text.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    for (let r = 0; r < 24; r++) {
        for (let c = 0; c < 24; c++) {
            if (r < 9 && c < 9) continue;
            if (r < 9 && c > 14) continue;
            if (r > 14 && c < 9) continue;
            
            const check = Math.abs(Math.sin(hash + (r * 31) + (c * 17)));
            if (check > 0.45) {
                ctx.fillStyle = check > 0.85 ? '#3d5afe' : '#10131b';
                ctx.beginPath();
                ctx.arc(
                    15 + c * cellSize + cellSize/2, 
                    15 + r * cellSize + cellSize/2, 
                    cellSize / 2.3, 
                    0, 
                    2 * Math.PI
                );
                ctx.fill();
            }
        }
    }
    
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(size/2, size/2, 22, 0, 2 * Math.PI);
    ctx.fill();
    
    ctx.fillStyle = '#3d5afe';
    ctx.beginPath();
    ctx.arc(size/2, size/2, 16, 0, 2 * Math.PI);
    ctx.fill();
    
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 12px Space Grotesk';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('LS', size/2, size/2 + 1);
}

const ANALYTICS_CAMPAIGNS = [
    {
        title: 'Hotjar: See User Traffic',
        desc: 'Heatmaps, recordings, and surveys to help you build better products. Get started for free.',
        promo: 'CODE "ANALYTICS20" FOR 20% DISCOUNT',
        img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=200&h=200&q=80'
    },
    {
        title: 'Namecheap Tech Domain $0.99',
        desc: 'Secure your custom brand with a premium .TECH domain extension. 90% off registration.',
        promo: 'CODE "TECHDOMAIN99" FOR 90% SAVE',
        img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=200&h=200&q=80'
    },
    {
        title: 'GA4 Masterclass Seminar',
        desc: 'Master UTM parameters, conversion triggers, custom funnels, and bounce metrics.',
        promo: 'CODE "GACLASS90" TO SAVE 90%',
        img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=200&h=200&q=80'
    },
    {
        title: 'Semrush Keyword Explorer Pro',
        desc: 'Deconstruct competitor search campaigns and find high-volume keyword targets.',
        promo: 'COMPETITOR DISCOVER ACCESS: SEMRUSHTRIAL',
        img: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=200&h=200&q=80'
    },
    {
        title: 'Zapier Web Redirect Pipelines',
        desc: 'Connect link redirection databases to Salesforce, Slack, and Google Sheets instantly.',
        promo: 'PIPELINE CONNECT CODE: ZAPIERAUTOMATE',
        img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=200&h=200&q=80'
    },
    {
        title: 'Mailchimp Campaign Planner',
        desc: 'Design gorgeous responsive email campaigns with smart dynamic custom UTM handles.',
        promo: 'NEWSLETTER DISCOUNT: MAILCHIMP40',
        img: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&w=200&h=200&q=80'
    }
];

let adsDisabled = false;

function openDetail(item, id) {
    const modal = document.getElementById('detailModal');
    const body = document.getElementById('modalBody');
    if (!modal || !body) return;

    const directClicks = Math.floor(item.clicks * 0.45);
    const socialClicks = Math.floor(item.clicks * 0.30);
    const organicClicks = Math.floor(item.clicks * 0.25);

    body.innerHTML = `
        <div class="modal-hero" style="background:url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&h=600&q=80') center/cover; height:240px; border-radius:16px; margin-bottom:2rem; box-shadow:0 10px 25px rgba(0,0,0,0.05); border:1px solid var(--border);"></div>
        <h2 style="font-size:2.2rem; font-family:'Space Grotesk',sans-serif; font-weight:700; margin:1rem 0; color:#090b0e; letter-spacing:-0.5px;">Analytics: ${item.title}</h2>
        <p style="font-size:1.2rem; color:var(--primary); font-weight:700; margin-bottom:1rem; word-break:break-all; font-family: monospace;">${item.url}</p>
        <p style="font-size:0.95rem; color:#555; line-height:1.6; margin-bottom:2rem;">Your custom redirect statistics ledger. Traffic audits analyze real-time referrals to deliver absolute performance charts.</p>
        
        <div class="extensive-info" style="display:grid; grid-template-columns:1fr 1fr; gap:2rem; margin-bottom:2rem;">
            <div style="background:#fafafa; border:1px solid rgba(0,0,0,0.06); padding:1.8rem; border-radius:16px;">
                <h3 style="margin-bottom:0.8rem; font-size:1.1rem; color:#090b0e; font-family:'Space Grotesk',sans-serif;">Traffic Channels</h3>
                <ul style="list-style:none; padding:0; color:#444; font-size:0.88rem; display:flex; flex-direction:column; gap:0.4rem;">
                    <li>🌍 Direct Inlets: ${directClicks} clicks (45%)</li>
                    <li>📱 Social Referral: ${socialClicks} clicks (30%)</li>
                    <li>🔍 Search Query: ${organicClicks} clicks (25%)</li>
                </ul>
            </div>
            <div style="background:#fafafa; border:1px solid rgba(0,0,0,0.06); padding:1.8rem; border-radius:16px;">
                <h3 style="margin-bottom:0.8rem; font-size:1.1rem; color:#090b0e; font-family:'Space Grotesk',sans-serif;">Audience Performance</h3>
                <p style="font-size:0.88rem; color:#444; line-height:1.5;">Total Clicks: <strong>${item.clicks}</strong><br>Unique Visitors: <strong>${Math.floor(item.clicks * 0.72)}</strong><br>Standard Bounce: <strong>14.5%</strong></p>
            </div>
        </div>
    `;
    
    const detailCampaign = ANALYTICS_CAMPAIGNS[id % ANALYTICS_CAMPAIGNS.length];
    const detailImg = document.getElementById('detail-ad-img');
    const detailTitle = document.getElementById('detail-ad-title');
    const detailDesc = document.getElementById('detail-ad-desc');
    
    if (detailImg) detailImg.src = detailCampaign.img;
    if (detailTitle) detailTitle.innerText = detailCampaign.title;
    if (detailDesc) detailDesc.innerText = detailCampaign.desc;

    modal.style.display = 'flex';
}

document.querySelector('.close-modal')?.addEventListener('click', () => {
    document.getElementById('detailModal').style.display = 'none';
});

// Modal Outside Click Close Handlers
window.onclick = (event) => {
    const detailModal = document.getElementById('detailModal');
    const domainModal = document.getElementById('domainModal');
    const qrCodeModal = document.getElementById('qrCodeModal');
    const premiumModal = document.getElementById('premiumUpgradeModal');
    const exitModal = document.getElementById('exitIntentModal');
    
    if (event.target == detailModal) detailModal.style.display = 'none';
    if (event.target == domainModal) domainModal.style.display = 'none';
    if (event.target == qrCodeModal) qrCodeModal.style.display = 'none';
    if (event.target == premiumModal) premiumModal.style.display = 'none';
    if (event.target == exitModal) exitModal.style.display = 'none';
}

// Custom Branded Domain Creator
const domainModal = document.getElementById('domainModal');
const btnOpenDomainCreator = document.getElementById('btn-open-domain-creator');
const btnCloseDomainModal = document.getElementById('btn-close-domain-modal');

if (btnOpenDomainCreator) {
    btnOpenDomainCreator.addEventListener('click', () => {
        if (domainModal) domainModal.style.display = 'flex';
    });
}

if (btnCloseDomainModal) {
    btnCloseDomainModal.addEventListener('click', () => {
        if (domainModal) domainModal.style.display = 'none';
    });
}

function submitCustomDomain() {
    const domain = document.getElementById('domain-custom-url').value.trim();
    const tag = document.getElementById('domain-campaign-tag').value.trim();

    if (!domain || !tag) {
        alert('❌ Please supply domain parameters.');
        return;
    }

    if (domainModal) domainModal.style.display = 'none';
    document.getElementById('custom-domain-form').reset();

    showSessionInterstitialAd(() => {
        addLinkRow(`Branded ${domain}`, `https://${domain}/${tag}`, 'globe');
        
        const celebrationModal = document.getElementById('celebrationModal');
        if (celebrationModal) celebrationModal.style.display = 'flex';
    });
}

// Rotating Sponsor Banner
let bannerIndex = 0;
function startRotatingBanner() {
    const banner = document.getElementById('floating-ad-banner');
    if (!banner || adsDisabled) return;

    const campaign = ANALYTICS_CAMPAIGNS[bannerIndex];
    bannerIndex = (bannerIndex + 1) % ANALYTICS_CAMPAIGNS.length;

    banner.innerHTML = `
        <div class="ad-sponsor-container">
            <img src="${campaign.img}" alt="${campaign.title}">
            <div class="banner-content">
                <p>Curated Campaign Sponsor</p>
                <strong>${campaign.title}</strong>
            </div>
        </div>
        <div class="banner-actions">
            <button class="btn-banner-action" id="btn-banner-claim">Claim Resource</button>
            <button class="btn-banner-close" id="btn-banner-close">×</button>
        </div>
    `;

    banner.style.display = 'flex';

    document.getElementById('btn-banner-claim')?.addEventListener('click', () => {
        alert(`🎉 Copied coupon code: "${campaign.promo.split('"')[1] || 'ANALYTICS20'}" to clipboard!`);
    });

    document.getElementById('btn-banner-close')?.addEventListener('click', () => {
        banner.style.display = 'none';
    });
}

setTimeout(() => {
    startRotatingBanner();
    setInterval(startRotatingBanner, 10000);
}, 2000);

// Decoupled Timed Interstitial Countdown
let interstitialCallback = null;
let interstitialTimer = null;
const interstitialModal = document.getElementById('interstitialModal');
const btnSkipAd = document.getElementById('btn-skip-ad');
const btnClaimAd = document.getElementById('btn-claim-ad');

function showSessionInterstitialAd(onClosed) {
    if (adsDisabled || !interstitialModal) {
        onClosed();
        return;
    }
    
    interstitialCallback = onClosed;
    
    const campaign = ANALYTICS_CAMPAIGNS[Math.floor(Math.random() * ANALYTICS_CAMPAIGNS.length)];
    const imgEl = document.getElementById('interstitial-ad-img');
    const titleEl = document.getElementById('interstitial-ad-title');
    const descEl = document.getElementById('interstitial-ad-desc');
    const promoEl = document.getElementById('interstitial-ad-promo');
    
    if (imgEl) imgEl.src = campaign.img;
    if (titleEl) titleEl.innerText = campaign.title;
    if (descEl) descEl.innerText = campaign.desc;
    if (promoEl) promoEl.innerText = campaign.promo;

    interstitialModal.style.display = 'flex';
    
    btnSkipAd.disabled = true;
    btnSkipAd.style.opacity = '0.4';
    btnSkipAd.style.cursor = 'not-allowed';
    btnSkipAd.innerText = 'Skip Ad in 5s';
    
    let count = 5;
    if (interstitialTimer) clearInterval(interstitialTimer);
    
    interstitialTimer = setInterval(() => {
        count--;
        if (count > 0) {
            btnSkipAd.innerText = `Skip Ad in ${count}s`;
        } else {
            clearInterval(interstitialTimer);
            btnSkipAd.innerText = 'Skip Ad';
            btnSkipAd.disabled = false;
            btnSkipAd.style.opacity = '1';
            btnSkipAd.style.cursor = 'pointer';
        }
    }, 1000);
}

if (btnSkipAd) {
    btnSkipAd.addEventListener('click', () => {
        interstitialModal.style.display = 'none';
        
        const celebrationModal = document.getElementById('celebrationModal');
        if (celebrationModal) {
            celebrationModal.style.display = 'flex';
        } else if (interstitialCallback) {
            interstitialCallback();
        }
    });
}

if (btnClaimAd) {
    btnClaimAd.addEventListener('click', () => {
        alert('🎉 Analytics discount whitelisted to active session!');
        interstitialModal.style.display = 'none';
        
        const celebrationModal = document.getElementById('celebrationModal');
        if (celebrationModal) {
            celebrationModal.style.display = 'flex';
        } else if (interstitialCallback) {
            interstitialCallback();
        }
    });
}

const btnCloseCelebrationModal = document.getElementById('btn-close-celebration');
if (btnCloseCelebrationModal) {
    btnCloseCelebrationModal.addEventListener('click', () => {
        document.getElementById('celebrationModal').style.display = 'none';
        if (interstitialCallback) {
            interstitialCallback();
            interstitialCallback = null;
        }
    });
}

// Scarcity Upgrade Tier
let upgradeTimer = null;
const premiumUpgradeModal = document.getElementById('premiumUpgradeModal');

function triggerUpgradeModal() {
    if (adsDisabled || !premiumUpgradeModal) return;
    
    premiumUpgradeModal.style.display = 'flex';
    let duration = 600;
    const countdownEl = document.getElementById('scarcity-countdown');

    if (upgradeTimer) clearInterval(upgradeTimer);

    upgradeTimer = setInterval(() => {
        duration--;
        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;
        if (countdownEl) {
            countdownEl.innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
        if (duration <= 0) {
            clearInterval(upgradeTimer);
            premiumUpgradeModal.style.display = 'none';
        }
    }, 1000);
}

setTimeout(triggerUpgradeModal, 40000);

document.getElementById('btn-skip-upgrade')?.addEventListener('click', () => {
    premiumUpgradeModal.style.display = 'none';
    clearInterval(upgradeTimer);
});

document.getElementById('btn-upgrade-now')?.addEventListener('click', () => {
    alert('🏆 Welcome to LinkSphere Pro! White-label domains unlocked, campaign sponsors deactivated.');
    adsDisabled = true;
    premiumUpgradeModal.style.display = 'none';
    const banner = document.getElementById('floating-ad-banner');
    if (banner) banner.style.display = 'none';
    clearInterval(upgradeTimer);
});

// Exit Intent & Mock Ad-Blocker
let exitIntentShown = false;
document.addEventListener("mouseout", (e) => {
    if (e.clientY < 0 && !exitIntentShown && !adsDisabled) {
        exitIntentShown = true;
        const exitModal = document.getElementById("exitIntentModal");
        if (exitModal) exitModal.style.display = "flex";
    }
});

document.getElementById("closeExitIntent")?.addEventListener("click", () => {
    document.getElementById("exitIntentModal").style.display = "none";
});
document.getElementById("declineExitIntent")?.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("exitIntentModal").style.display = "none";
});

setTimeout(() => {
    if (adsDisabled) return;
    const isAdBlockerActive = Math.random() < 0.15;
    if (isAdBlockerActive) {
        const adBlockModal = document.getElementById("adBlockModal");
        if (adBlockModal) adBlockModal.style.display = "flex";
    }
}, 5000);

document.getElementById('btn-adblock-premium')?.addEventListener('click', () => {
    alert('🏆 Pro Activated! Ad banners disabled.');
    adsDisabled = true;
    document.getElementById("adBlockModal").style.display = "none";
    const banner = document.getElementById('floating-ad-banner');
    if (banner) banner.style.display = 'none';
});

// Live Generated UTM Link Previewer
function updateCampaignPreviewLink() {
    const nameEl = document.getElementById('bio-name');
    const name = nameEl ? (nameEl.value || 'Jane Doe') : 'Jane Doe';
    
    const utmSourceEl = document.getElementById('utm-source');
    const utmCampaignEl = document.getElementById('utm-campaign');
    
    const utmSource = utmSourceEl ? utmSourceEl.value.trim() : '';
    const utmMedium = getUtmMediumValue();
    const utmCampaign = utmCampaignEl ? utmCampaignEl.value.trim() : '';
    
    let campaignUrl = `https://linksphere.bio/${encodeURIComponent(name.toLowerCase().replace(/\s+/g, '-'))}`;
    const params = [];
    if (utmSource) params.push(`utm_source=${encodeURIComponent(utmSource)}`);
    if (utmMedium) params.push(`utm_medium=${encodeURIComponent(utmMedium)}`);
    if (utmCampaign) params.push(`utm_campaign=${encodeURIComponent(utmCampaign)}`);
    
    if (params.length > 0) {
        campaignUrl += `?${params.join('&')}`;
    }
    
    const previewEl = document.getElementById('campaign-preview-link');
    if (previewEl) {
        previewEl.innerText = campaignUrl;
    }
}

// Handle Custom Fallback Container Display
function handleMediumChange() {
    const utmMediumEl = document.getElementById('utm-medium');
    const customContainer = document.getElementById('custom-medium-container');
    if (utmMediumEl && customContainer) {
        if (utmMediumEl.value === 'custom') {
            customContainer.style.display = 'block';
        } else {
            customContainer.style.display = 'none';
        }
    }
    updateCampaignPreviewLink();
}

// Apply Selected Marketing Preset Parameters
function applyUtmPreset(source, medium, campaign) {
    const utmSourceEl = document.getElementById('utm-source');
    const utmMediumEl = document.getElementById('utm-medium');
    const utmCampaignEl = document.getElementById('utm-campaign');
    const customContainer = document.getElementById('custom-medium-container');
    const customInput = document.getElementById('utm-medium-custom');
    
    if (utmSourceEl) utmSourceEl.value = source;
    if (utmCampaignEl) utmCampaignEl.value = campaign;
    
    if (utmMediumEl) {
        const hasOption = Array.from(utmMediumEl.options).some(opt => opt.value === medium);
        if (hasOption) {
            utmMediumEl.value = medium;
            if (customContainer) customContainer.style.display = 'none';
        } else {
            utmMediumEl.value = 'custom';
            if (customContainer) customContainer.style.display = 'block';
            if (customInput) customInput.value = medium;
        }
    }
    
    updateCampaignPreviewLink();
}

// QR Code Modal Bindings
const btnRenderQRCode = document.getElementById('btn-render-qrcode');
const qrCodeModal = document.getElementById('qrCodeModal');
const btnCloseQrModal = document.getElementById('btn-close-qr-modal');

if (btnRenderQRCode) {
    btnRenderQRCode.addEventListener('click', () => {
        const nameEl = document.getElementById('bio-name');
        const name = nameEl ? (nameEl.value || 'Jane Doe') : 'Jane Doe';
        
        const utmSourceEl = document.getElementById('utm-source');
        const utmCampaignEl = document.getElementById('utm-campaign');
        
        const utmSource = utmSourceEl ? utmSourceEl.value.trim() : '';
        const utmMedium = getUtmMediumValue();
        const utmCampaign = utmCampaignEl ? utmCampaignEl.value.trim() : '';
        
        let campaignUrl = `https://linksphere.bio/${encodeURIComponent(name.toLowerCase().replace(/\s+/g, '-'))}`;
        const params = [];
        if (utmSource) params.push(`utm_source=${encodeURIComponent(utmSource)}`);
        if (utmMedium) params.push(`utm_medium=${encodeURIComponent(utmMedium)}`);
        if (utmCampaign) params.push(`utm_campaign=${encodeURIComponent(utmCampaign)}`);
        
        if (params.length > 0) {
            campaignUrl += `?${params.join('&')}`;
        }
        
        drawPremiumQRCode('qr-canvas', campaignUrl);
        if (qrCodeModal) qrCodeModal.style.display = 'flex';
    });
}

if (btnCloseQrModal) {
    btnCloseQrModal.addEventListener('click', () => {
        if (qrCodeModal) qrCodeModal.style.display = 'none';
    });
}

document.getElementById('btn-download-qr')?.addEventListener('click', () => {
    const canvas = document.getElementById('qr-canvas');
    if (!canvas) return;
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = 'linksphere-campaign-qr.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
});

document.getElementById('btn-copy-campaign-link')?.addEventListener('click', () => {
    const nameEl = document.getElementById('bio-name');
    const name = nameEl ? (nameEl.value || 'Jane Doe') : 'Jane Doe';
    
    const utmSourceEl = document.getElementById('utm-source');
    const utmCampaignEl = document.getElementById('utm-campaign');
    
    const utmSource = utmSourceEl ? utmSourceEl.value.trim() : '';
    const utmMedium = getUtmMediumValue();
    const utmCampaign = utmCampaignEl ? utmCampaignEl.value.trim() : '';
    
    let campaignUrl = `https://linksphere.bio/${encodeURIComponent(name.toLowerCase().replace(/\s+/g, '-'))}`;
    const params = [];
    if (utmSource) params.push(`utm_source=${encodeURIComponent(utmSource)}`);
    if (utmMedium) params.push(`utm_medium=${encodeURIComponent(utmMedium)}`);
    if (utmCampaign) params.push(`utm_campaign=${encodeURIComponent(utmCampaign)}`);
    
    if (params.length > 0) {
        campaignUrl += `?${params.join('&')}`;
    }
    
    navigator.clipboard.writeText(campaignUrl);
    const btn = document.getElementById('btn-copy-campaign-link');
    if (btn) {
        btn.innerText = 'Copied Link!';
        setTimeout(() => btn.innerText = 'Copy Link', 1500);
    }
});

// App Startup Initializer
function startApp() {
    initLinksBuilder();
    
    document.getElementById('bio-name')?.addEventListener('input', () => {
        updatePhonePreview();
        updateCampaignPreviewLink();
    });
    document.getElementById('bio-tagline')?.addEventListener('input', updatePhonePreview);
    document.getElementById('bio-theme')?.addEventListener('change', updatePhonePreview);
    
    document.getElementById('utm-source')?.addEventListener('input', updateCampaignPreviewLink);
    document.getElementById('utm-medium')?.addEventListener('change', handleMediumChange);
    document.getElementById('utm-medium-custom')?.addEventListener('input', updateCampaignPreviewLink);
    document.getElementById('utm-campaign')?.addEventListener('input', updateCampaignPreviewLink);
    
    document.getElementById('btn-add-link-block')?.addEventListener('click', () => {
        addLinkRow("My Social Link", "https://mysocial.com", "globe");
    });
    
    // Perform initial preview URL sync
    updateCampaignPreviewLink();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startApp);
} else {
    startApp();
}
