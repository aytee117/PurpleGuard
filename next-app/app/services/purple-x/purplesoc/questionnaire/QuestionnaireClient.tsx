"use client";

import { useEffect, useRef } from "react";

const BODY_HTML = `
<div class="shell">

  <aside class="sidebar">
    <div class="nav-group">
      <div class="nav-group-title">General</div>
      <div class="nav-item active" id="nav-general" onclick="showPage('page-general')">
        <span class="nav-dot"></span><span class="nav-label">Company &amp; SOC setup</span>
      </div>
    </div>

    <div class="nav-group">
      <div class="nav-group-title">Sites</div>
      <div id="site-nav-list"></div>
    </div>

    <div class="nav-group">
      <div class="nav-group-title">Finalise</div>
      <div class="nav-item" id="nav-retention" onclick="showPage('page-retention')">
        <span class="nav-dot"></span><span class="nav-label">Retention &amp; EPS</span>
      </div>
      <div class="nav-item" id="nav-results" onclick="void(0)">
        <span class="nav-dot"></span><span class="nav-label">Results</span>
      </div>
    </div>

    <div class="lds-widget">
      <div class="lds-widget-title">Total LDS (live)</div>
      <div class="lds-total" id="w-total-lds">0</div>
      <div class="lds-total-sub">across all sites</div>
      <div class="lds-bar-wrap"><div class="lds-bar" id="w-lds-bar"></div></div>
      <div class="lds-site-breakdown" id="w-site-breakdown"></div>
    </div>
  </aside>

  <main class="main">

    <div class="page active" id="page-general">
      <div class="step-eyebrow">PurpleSOC Discovery Questionnaire</div>
      <div class="step-title">Let's scope your SOC.</div>
      <div class="step-desc">Fill in your company details and SOC preferences. Then we'll walk through each site separately. Takes about 5 minutes.</div>

      <div class="card">
        <div class="card-title">Company information</div>
        <div class="field-row">
          <div class="field"><label>Company name</label><input type="text" id="f-company" placeholder="Acme Corp" /></div>
          <div class="field"><label>Your name</label><input type="text" id="f-name" placeholder="Ahmed Hassan" /></div>
        </div>
        <div class="field-row">
          <div class="field"><label>Work email</label><input type="email" id="f-email" placeholder="ahmed@company.com" /></div>
          <div class="field"><label>Number of sites / locations</label>
            <input type="number" id="f-sites" value="1" min="1" max="10" oninput="onSitesChange()" />
          </div>
        </div>
        <div class="field-row">
          <div class="field"><label>Industry</label>
            <select id="f-industry" onchange="toggleIndustryOther()">
              <option value="">Select industry</option>
              <option>Banking &amp; Finance</option><option>Telecoms</option><option>Healthcare</option>
              <option>Government</option><option>Manufacturing</option><option>Retail &amp; E-Commerce</option>
              <option>Energy &amp; Utilities</option><option>Education</option><option>Other</option>
            </select>
            <input type="text" id="f-industry-other" placeholder="Please specify your industry" maxlength="100" style="display:none;margin-top:8px;" />
          </div>
          <div class="field"><label>Country</label>
            <div class="custom-multi-select" id="country-dropdown">
              <button type="button" class="multi-select-trigger" id="country-trigger" onclick="toggleCountryDropdown()" aria-haspopup="listbox" aria-expanded="false">
                <span id="country-display">Select country</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
              </button>
              <div class="multi-select-panel" id="country-panel" role="listbox" aria-multiselectable="true">
                <label class="multi-select-option"><input type="checkbox" value="Egypt" onchange="updateCountryDisplay()" /> Egypt</label>
                <label class="multi-select-option"><input type="checkbox" value="Saudi Arabia" onchange="updateCountryDisplay()" /> Saudi Arabia</label>
                <label class="multi-select-option"><input type="checkbox" value="UAE" onchange="updateCountryDisplay()" /> UAE</label>
                <label class="multi-select-option"><input type="checkbox" value="Kuwait" onchange="updateCountryDisplay()" /> Kuwait</label>
                <label class="multi-select-option"><input type="checkbox" value="Qatar" onchange="updateCountryDisplay()" /> Qatar</label>
                <label class="multi-select-option"><input type="checkbox" value="Other" onchange="updateCountryDisplay()" /> Other</label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-title">Team &amp; current SOC setup</div>
        <div class="field-row">
          <div class="field"><label>Number of security staff</label><input type="number" id="f-secstaff" value="0" min="0" /></div>
          <div class="field"><label>Internal SOC team?</label>
            <select id="f-internalsoc" onchange="updateRecommendation()">
              <option value="no">No internal SOC</option>
              <option value="partial">Partial / 1–2 people</option>
              <option value="yes">Yes, dedicated SOC team</option>
            </select>
          </div>
        </div>
        <div class="field-row">
          <div class="field"><label>Currently using an MSSP?</label>
            <select id="f-mssp"><option value="no">No</option><option value="yes">Yes</option></select>
          </div>
          <div class="field"><label>Compliance requirements</label>
            <div class="pill-wrap" id="compliance-pills">
              <div class="pill" onclick="this.classList.toggle('on')">ISO 27001</div>
              <div class="pill" onclick="this.classList.toggle('on')">NCA</div>
              <div class="pill" onclick="this.classList.toggle('on')">PCI-DSS</div>
              <div class="pill" onclick="this.classList.toggle('on')">NIST</div>
              <div class="pill" onclick="this.classList.toggle('on')">CIS Controls</div>
              <div class="pill" onclick="this.classList.toggle('on')">FRA Decree 139</div>
              <div class="pill" onclick="this.classList.toggle('on')">None</div>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-title">Preferred SOC model</div>
        <div class="soc-grid">
          <div class="soc-card on" id="soc-managed" onclick="selectSOC('managed')">
            <div class="soc-icon">&#9729;</div>
            <div class="soc-title">Managed SOC</div>
            <div class="soc-desc">Fully hosted and operated by PurpleGuard. Zero infrastructure required.</div>
            <div class="soc-rec">&#10003; Recommended for you</div>
          </div>
          <div class="soc-card" id="soc-comanaged" onclick="selectSOC('comanaged')">
            <div class="soc-icon">&#9881;</div>
            <div class="soc-title">Co-Managed SOC</div>
            <div class="soc-desc">You host, we operate. Your data stays on your infrastructure.</div>
            <div class="soc-rec">&#10003; Recommended for you</div>
          </div>
          <div class="soc-card" id="soc-self" onclick="selectSOC('self')">
            <div class="soc-icon">&#128736;</div>
            <div class="soc-title">Self-Managed</div>
            <div class="soc-desc">We deploy the platform, your team operates it independently.</div>
            <div class="soc-rec">&#10003; Recommended for you</div>
          </div>
        </div>
      </div>

      <div class="btn-row">
        <button class="btn btn-primary" onclick="goToFirstSite()">
          Next: site inventory
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </div>
    </div>

    <div class="page" id="page-sites">
      <div class="step-eyebrow">Site inventory</div>
      <div class="step-title">Device inventory per site</div>
      <div class="step-desc">Switch between site tabs to fill each location. LDS updates live as you go.</div>

      <div class="site-tabs-wrap">
        <div class="site-tabs" id="site-tabs"></div>
        <div id="site-panels"></div>
      </div>

      <div class="btn-row">
        <button class="btn btn-primary" onclick="showPage('page-retention'); setNavActive('nav-retention');">
          Next: retention &amp; EPS
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
        <button class="btn btn-ghost" onclick="showPage('page-general'); setNavActive('nav-general');">Back</button>
      </div>
    </div>

    <div class="page" id="page-retention">
      <div class="step-eyebrow">Finalise</div>
      <div class="step-title">Retention &amp; additional context</div>
      <div class="step-desc">Almost done. Set your retention requirements and add any notes.</div>

      <div class="card">
        <div class="card-title">Data retention</div>
        <div class="field-row-3">
          <div class="field"><label>Indexed / hot retention (days)</label><input type="number" id="f-hot" value="30" min="1" oninput="updateAllLDS()" /></div>
          <div class="field"><label>Archive / cold retention (days)</label><input type="number" id="f-cold" value="90" min="0" oninput="updateAllLDS()" /></div>
          <div class="field"><label>Known avg. EPS (0 = estimate)</label><input type="number" id="f-eps" value="0" min="0" oninput="updateAllLDS()" /></div>
        </div>
      </div>

      <div class="card">
        <div class="card-title">Additional context</div>
        <div class="field">
          <label>Anything else we should know? (current tools, pain points, timeline)</label>
          <textarea id="f-notes" rows="4" placeholder="e.g. We currently use ManageEngine and want to replace it. We need to be compliant by Q3..."></textarea>
        </div>
      </div>

      <div class="btn-row">
        <button class="btn btn-primary" onclick="showResults()">
          See my sizing &amp; estimate
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
        <button class="btn btn-ghost" onclick="showPage('page-sites'); setNavActive(null);">Back</button>
      </div>
    </div>

    <div class="page" id="page-results">
      <div class="step-eyebrow">Your SOC sizing</div>
      <div class="step-title" id="res-title">PurpleSOC estimate</div>
      <div class="step-desc">Based on your full environment across all sites. Figures are indicative — final sizing validated post-onboarding.</div>

      <div class="hero-card">
        <h2>Here's what your SOC looks like.</h2>
        <p id="res-hero-sub">—</p>
        <div class="hero-metrics">
          <div class="hero-metric"><div class="hero-metric-label">Total LDS</div><div class="hero-metric-value" id="res-lds">—</div><div class="hero-metric-sub">all sites combined</div></div>
          <div class="hero-metric"><div class="hero-metric-label">Est. EPS</div><div class="hero-metric-value" id="res-eps">—</div><div class="hero-metric-sub">typical</div></div>
          <div class="hero-metric"><div class="hero-metric-label">Storage required</div><div class="hero-metric-value" id="res-storage">—</div><div class="hero-metric-sub">incl. 25% overhead</div></div>
        </div>
      </div>

      <div class="res-card">
        <div class="res-card-title">Site breakdown</div>
        <table class="site-table" id="res-site-table"></table>
      </div>

      <div class="res-card">
        <div class="res-card-title">Recommended configuration</div>
        <div class="res-row"><span class="res-key">SOC model</span><span class="res-val" id="res-model">—</span></div>
        <div class="res-row"><span class="res-key">SIEM platform</span><span class="res-val"><span class="badge-p">Logsign</span></span></div>
        <div class="res-row"><span class="res-key">Pricing tier</span><span class="res-val" id="res-tier">—</span></div>
        <div class="res-row"><span class="res-key">Annual subscription</span><span class="res-val" id="res-annual">—</span></div>
        <div class="res-row"><span class="res-key">Monthly</span><span class="res-val" id="res-monthly">—</span></div>
        <div class="res-row"><span class="res-key">Setup fee (one-time)</span><span class="res-val" id="res-setup">—</span></div>
        <div class="res-row"><span class="res-key">Total year 1</span><span class="res-val" id="res-year1">—</span></div>
      </div>

      <div class="res-card" id="res-spec-card">
        <div class="res-card-title">Server specification (customer-hosted)</div>
        <div id="res-spec-block"></div>
      </div>

      <div class="cta-card">
        <div><h3>Ready for a tailored proposal?</h3><p>We'll send you a scoped proposal within 24 hours.</p></div>
        <button class="btn-cta" onclick="openQuote()">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          Request a proposal
        </button>
      </div>

      <div class="btn-row">
        <button class="btn btn-ghost" onclick="showPage('page-retention'); setNavActive('nav-retention');">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Edit answers
        </button>
        <button class="btn btn-danger" onclick="resetAll()">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.5"/></svg>
          Reset and start over
        </button>
      </div>
      <div class="footer">PurpleGuard &nbsp;·&nbsp; purpleguard.io &nbsp;·&nbsp; Smarter Security. Stronger Defense.<br>Pricing in USD. Final sizing validated post-onboarding.</div>
    </div>

  </main>
</div>
`;

const SCRIPT_BODY = `
// ── Device catalogue ──
var DEVICES = [
  { id:'fw-p',  cat:'Network',   name:'Firewall (Perimeter / Edge)',       epsTyp:200 },
  { id:'fw-c',  cat:'Network',   name:'Firewall (Core / Internal / DC)',   epsTyp:100 },
  { id:'fw-v',  cat:'Network',   name:'Firewall (Cloud / Virtual)',        epsTyp:80  },
  { id:'sw-c',  cat:'Network',   name:'Core Switch',                       epsTyp:80  },
  { id:'sw-d',  cat:'Network',   name:'Distribution Switch',               epsTyp:30  },
  { id:'sw-a',  cat:'Network',   name:'Access Switch',                     epsTyp:20  },
  { id:'wifi',  cat:'Network',   name:'Wireless Controller',               epsTyp:15  },
  { id:'vpn',   cat:'Network',   name:'Enterprise VPN / Remote Access',    epsTyp:15  },
  { id:'lb',    cat:'Network',   name:'Load Balancer',                     epsTyp:20  },
  { id:'waf',   cat:'Security',  name:'WAF',                               epsTyp:50  },
  { id:'edr',   cat:'Security',  name:'EDR / XDR (per 100 endpoints)',     epsTyp:30, per100:true },
  { id:'nac',   cat:'Security',  name:'NAC',                               epsTyp:10  },
  { id:'dlp',   cat:'Security',  name:'DLP',                               epsTyp:10  },
  { id:'email', cat:'Security',  name:'Email Security Gateway',            epsTyp:20  },
  { id:'sase',  cat:'Security',  name:'SASE / ZTNA',                       epsTyp:15  },
  { id:'iam',   cat:'Security',  name:'IAM / MFA',                         epsTyp:10  },
  { id:'pam',   cat:'Security',  name:'PAM',                               epsTyp:10  },
  { id:'vuln',  cat:'Security',  name:'Vulnerability Management',          epsTyp:5   },
  { id:'win',   cat:'Server',    name:'Windows Server (non-DC)',            epsTyp:20  },
  { id:'dc',    cat:'Server',    name:'Domain Controller',                  epsTyp:100 },
  { id:'lnx',   cat:'Server',    name:'Linux Server',                       epsTyp:10  },
  { id:'vm',    cat:'Server',    name:'Virtual Server (mixed OS)',           epsTyp:20  },
  { id:'cloud', cat:'Server',    name:'Cloud Account (AWS/Azure/GCP)',      epsTyp:30  },
  { id:'m365',  cat:'Server',    name:'Microsoft 365 (per tenant)',         epsTyp:40  },
  { id:'ws',    cat:'Endpoint',  name:'Windows Workstations (per 50)',      epsTyp:3,  per50:true },
  { id:'db',    cat:'App',       name:'Database Server',                    epsTyp:20  },
  { id:'web',   cat:'App',       name:'Web Server (IIS/Apache/Nginx)',      epsTyp:40  },
  { id:'exch',  cat:'App',       name:'Exchange (on-prem)',                 epsTyp:20  },
  { id:'dhcp',  cat:'App',       name:'DHCP Server',                        epsTyp:30  },
  { id:'dns',   cat:'App',       name:'DNS Server',                         epsTyp:30  },
];

var CATS = ['Network','Security','Server','Endpoint','App'];
window.selectedSoc = 'managed';
window.numSites = 1;
window.activeSiteTab = 0;
window.activePage = 'page-general';

var TIERS = {
  managed:   [{max:100,sku:'PG-LS-LDS1',a:907},{max:250,sku:'PG-LS-LDS2',a:817},{max:500,sku:'PG-LS-LDS3',a:736},{max:1000,sku:'PG-LS-LDS4',a:663},{max:2500,sku:'PG-LS-LDS5',a:597}],
  comanaged: [{max:100,sku:'PG-LS-LDS1C',a:660},{max:250,sku:'PG-LS-LDS2C',a:594},{max:500,sku:'PG-LS-LDS3C',a:535},{max:1000,sku:'PG-LS-LDS4C',a:482},{max:2500,sku:'PG-LS-LDS5C',a:434}],
  self:      [{max:100,sku:'PG-LS-USO1',a:407},{max:250,sku:'PG-LS-USO2',a:367},{max:500,sku:'PG-LS-USO3',a:331},{max:1000,sku:'PG-LS-USO4',a:298},{max:2500,sku:'PG-LS-USO5',a:269}]
};
var SETUP = [{max:100,fee:80},{max:250,fee:70},{max:500,fee:60},{max:1000,fee:50},{max:2500,fee:40}];
var SPECS = [
  {max:50,  cpu:'16 Core',ram:'32 GB', baseGB:4000, lbl:'4 TB SSD', eps:'Up to 1,500 EPS'},
  {max:100, cpu:'32 Core',ram:'64 GB', baseGB:8000, lbl:'8 TB SSD', eps:'Up to 3,000 EPS'},
  {max:200, cpu:'64 Core',ram:'128 GB',baseGB:15000,lbl:'15 TB SSD',eps:'Up to 6,000 EPS'},
  {max:500, cpu:'64 Core',ram:'256 GB',baseGB:30000,lbl:'30 TB SSD',eps:'Up to 15,000 EPS'},
  {max:99999,cpu:'Cluster',ram:'Cluster',baseGB:999999,lbl:'Cluster',eps:'15,000+ EPS'}
];

window.getTier = function(arr, n) { return arr.filter(function(t){return n<=t.max;})[0]||arr[arr.length-1]; }
window.fmt = function(n) { return '$'+Math.round(n).toLocaleString(); }
window.fmtSz = function(gb) { return gb>=1024?(gb/1024).toFixed(1)+' TB':Math.round(gb)+' GB'; }

window.devLDS = function(siteIdx, d) {
  var yb = document.getElementById('y-'+siteIdx+'-'+d.id);
  if (!yb || !yb.classList.contains('on')) return 0;
  var cnt = parseInt(document.getElementById('c-'+siteIdx+'-'+d.id).value)||0;
  if (d.per50)  return Math.ceil(cnt/50);
  if (d.per100) return Math.ceil(cnt/100);
  return cnt;
}
window.devEPS = function(siteIdx, d) {
  var yb = document.getElementById('y-'+siteIdx+'-'+d.id);
  if (!yb || !yb.classList.contains('on')) return 0;
  var cnt = parseInt(document.getElementById('c-'+siteIdx+'-'+d.id).value)||0;
  return cnt * d.epsTyp;
}
window.siteLDS = function(siteIdx) {
  var t = 0; DEVICES.forEach(function(d){t+=window.devLDS(siteIdx,d);}); return t;
}
window.siteEPS = function(siteIdx) {
  var t = 0; DEVICES.forEach(function(d){t+=window.devEPS(siteIdx,d);}); return t;
}
window.totalLDS = function() {
  var t=0; for(var i=0;i<window.numSites;i++) t+=window.siteLDS(i); return t;
}
window.totalEPS = function() {
  var t=0; for(var i=0;i<window.numSites;i++) t+=window.siteEPS(i); return t;
}

window.buildSitePanel = function(siteIdx) {
  var html = '<div class="site-name-row"><label>Site name:</label><input type="text" id="sname-'+siteIdx+'" value="Site '+(siteIdx+1)+'" oninput="updateSiteTabLabel('+siteIdx+')" placeholder="e.g. Headquarters" /></div>';

  CATS.forEach(function(cat) {
    var catDevs = DEVICES.filter(function(d){return d.cat===cat;});
    html += '<div class="cat-group"><div class="card-title">'+cat+'</div>';
    html += '<div class="dev-header"><span>Device</span><span>Present?</span><span>Count</span><span>LDS</span></div>';
    catDevs.forEach(function(d) {
      html +=
        '<div class="device-row" id="dr-'+siteIdx+'-'+d.id+'">'+
          '<span class="device-name">'+d.name+'</span>'+
          '<span class="toggle-wrap">'+
            '<button class="tog yes" id="y-'+siteIdx+'-'+d.id+'" onclick="togDev('+siteIdx+',\\''+d.id+'\\',true)">Yes</button>'+
            '<button class="tog no on" id="n-'+siteIdx+'-'+d.id+'" onclick="togDev('+siteIdx+',\\''+d.id+'\\',false)">No</button>'+
          '</span>'+
          '<span><input type="number" id="c-'+siteIdx+'-'+d.id+'" value="0" min="0" max="9999" oninput="onCountInput('+siteIdx+',\\''+d.id+'\\')" class="count-input" /></span>'+
          '<span class="lds-chip zero" id="l-'+siteIdx+'-'+d.id+'">0</span>'+
        '</div>';
    });
    html += '</div>';
  });

  var isLast = (siteIdx === window.numSites - 1);
  html += '<div class="btn-row site-panel-btn-row">';
  if (!isLast) {
    html += '<button class="btn btn-primary" onclick="proceedFromSite(' + siteIdx + ')">' +
      'Save and proceed to <span id="siteproc-lbl-' + (siteIdx+1) + '">Site ' + (siteIdx+2) + '</span>' +
      ' <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>' +
      '</button>';
  } else {
    html += '<button class="btn btn-primary" onclick="proceedFromSite(' + siteIdx + ')">' +
      'Save and proceed to Retention &amp; EPS' +
      ' <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>' +
      '</button>';
  }
  html += '<button class="btn btn-danger" onclick="resetSite(' + siteIdx + ')">' +
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.5"/></svg>' +
    ' Reset site data</button>';
  html += '</div>';
  return html;
}

window.togDev = function(siteIdx, devId, exists) {
  var yb = document.getElementById('y-'+siteIdx+'-'+devId);
  var nb = document.getElementById('n-'+siteIdx+'-'+devId);
  var ci = document.getElementById('c-'+siteIdx+'-'+devId);
  if (exists) {
    yb.classList.add('on'); nb.classList.remove('on');
    if (!parseInt(ci.value)) ci.value = 1;
  } else {
    nb.classList.add('on'); yb.classList.remove('on');
    ci.value = 0;
  }
  window.updateAllLDS();
}

window.onCountInput = function(siteIdx, devId) {
  var ci = document.getElementById('c-'+siteIdx+'-'+devId);
  var yb = document.getElementById('y-'+siteIdx+'-'+devId);
  var nb = document.getElementById('n-'+siteIdx+'-'+devId);
  var val = parseInt(ci.value) || 0;
  if (val > 0) {
    yb.classList.add('on');
    nb.classList.remove('on');
  } else {
    nb.classList.add('on');
    yb.classList.remove('on');
  }
  window.updateAllLDS();
}

window.generateSites = function() {
  window.numSites = Math.min(10, Math.max(1, parseInt(document.getElementById('f-sites').value)||1));
  var tabsEl   = document.getElementById('site-tabs');
  var panelsEl = document.getElementById('site-panels');
  var navList  = document.getElementById('site-nav-list');
  tabsEl.innerHTML = ''; panelsEl.innerHTML = ''; navList.innerHTML = '';

  for (var i = 0; i < window.numSites; i++) {
    (function(idx) {
      var tab = document.createElement('button');
      tab.className = 'site-tab' + (idx===0?' active':'');
      tab.id = 'tab-'+idx;
      tab.textContent = 'Site '+(idx+1);
      tab.onclick = function(){ window.switchSiteTab(idx); };
      tabsEl.appendChild(tab);

      var panel = document.createElement('div');
      panel.className = 'site-panel' + (idx===0?' active':'');
      panel.id = 'panel-'+idx;
      panel.innerHTML = window.buildSitePanel(idx);
      panelsEl.appendChild(panel);

      var ni = document.createElement('div');
      ni.className = 'site-nav-item' + (idx===0?' active':'');
      ni.id = 'sitenav-'+idx;
      ni.innerHTML = '<span class="nav-dot"></span><span class="nav-label" id="snavlbl-'+idx+'">Site '+(idx+1)+'</span><span class="site-nav-lds" id="snavlds-'+idx+'">0 LDS</span>';
      ni.onclick = (function(i){ return function(){ window.showPage('page-sites'); window.switchSiteTab(i); }; })(idx);
      navList.appendChild(ni);
    })(i);
  }
  window.activeSiteTab = 0;
  window.updateAllLDS();
}

window.switchSiteTab = function(idx) {
  window.activeSiteTab = idx;
  for (var i = 0; i < window.numSites; i++) {
    var t = document.getElementById('tab-'+i);
    var p = document.getElementById('panel-'+i);
    var n = document.getElementById('sitenav-'+i);
    if (t) t.classList.toggle('active', i===idx);
    if (p) p.classList.toggle('active', i===idx);
    if (n) n.classList.toggle('active', i===idx);
  }
}

window.updateSiteTabLabel = function(idx) {
  var nameEl = document.getElementById('sname-'+idx);
  var name = nameEl ? (nameEl.value||'Site '+(idx+1)) : 'Site '+(idx+1);
  var tab = document.getElementById('tab-'+idx);
  var lbl = document.getElementById('snavlbl-'+idx);
  var procLbl = document.getElementById('siteproc-lbl-'+idx);
  if (tab) tab.textContent = name;
  if (lbl) lbl.textContent = name;
  if (procLbl) procLbl.textContent = name;
}

window.updateAllLDS = function() {
  var grand = 0;
  for (var i = 0; i < window.numSites; i++) {
    var sLDS = window.siteLDS(i);
    grand += sLDS;
    DEVICES.forEach(function(d) {
      var chip = document.getElementById('l-'+i+'-'+d.id);
      if (chip) {
        var v = window.devLDS(i,d);
        chip.textContent = v;
        chip.className = v>0?'lds-chip':'lds-chip zero';
      }
    });
    var badge = document.getElementById('snavlds-'+i);
    if (badge) badge.textContent = sLDS+' LDS';
  }
  var tw = document.getElementById('w-total-lds');
  var bar = document.getElementById('w-lds-bar');
  if (tw) tw.textContent = grand;
  if (bar) bar.style.width = Math.min(100, Math.round(grand/500*100))+'%';
  var bd = document.getElementById('w-site-breakdown');
  if (bd) {
    var bdHtml = '';
    for (var j=0;j<window.numSites;j++) {
      var nm = document.getElementById('sname-'+j);
      var label = nm?(nm.value||'Site '+(j+1)):'Site '+(j+1);
      bdHtml += '<div class="lds-site-row"><span>'+label+'</span><span>'+window.siteLDS(j)+' LDS</span></div>';
    }
    bd.innerHTML = bdHtml;
  }
}

window.showPage = function(id) {
  document.querySelectorAll('.page').forEach(function(p){ p.classList.remove('active'); });
  document.getElementById(id).classList.add('active');
  window.activePage = id;
  window.scrollTo({top:0,behavior:'smooth'});
}
window.setNavActive = function(navId) {
  document.querySelectorAll('.nav-item').forEach(function(n){ n.classList.remove('active'); });
  if (navId) { var el=document.getElementById(navId); if(el) el.classList.add('active'); }
}
window.selectSOC = function(m) {
  window.selectedSoc = m;
  ['managed','comanaged','self'].forEach(function(k){
    document.getElementById('soc-'+k).classList.toggle('on', k===m);
  });
}
window.updateRecommendation = function() {
  var v = document.getElementById('f-internalsoc').value;
  ['managed','comanaged','self'].forEach(function(k){ document.getElementById('soc-'+k).classList.remove('rec'); });
  var rec = v==='no'?'managed':v==='partial'?'comanaged':'self';
  document.getElementById('soc-'+rec).classList.add('rec');
  window.selectSOC(rec);
}
window.proceedFromSite = function(siteIdx) {
  if (siteIdx < window.numSites - 1) {
    window.switchSiteTab(siteIdx + 1);
    window.scrollTo({top: 0, behavior: 'smooth'});
  } else {
    window.showPage('page-retention');
    window.setNavActive('nav-retention');
  }
}

window.resetSite = function(siteIdx) {
  if (!confirm('Reset all device data for this site? This cannot be undone.')) return;
  var nameEl = document.getElementById('sname-' + siteIdx);
  if (nameEl) { nameEl.value = 'Site ' + (siteIdx + 1); window.updateSiteTabLabel(siteIdx); }
  DEVICES.forEach(function(d) {
    var yb = document.getElementById('y-' + siteIdx + '-' + d.id);
    var nb = document.getElementById('n-' + siteIdx + '-' + d.id);
    var ci = document.getElementById('c-' + siteIdx + '-' + d.id);
    if (yb) yb.classList.remove('on');
    if (nb) nb.classList.add('on');
    if (ci) ci.value = 0;
  });
  window.updateAllLDS();
}

window.resetAll = function() {
  if (!confirm('This will clear all fields and answers across all sites. Are you sure?')) return;
  ['f-company','f-name','f-email'].forEach(function(id){ document.getElementById(id).value = ''; });
  document.getElementById('f-sites').value = 1;
  document.getElementById('f-industry').value = '';
  var oi = document.getElementById('f-industry-other');
  if (oi) { oi.value = ''; oi.style.display = 'none'; }
  document.querySelectorAll('#country-panel input[type="checkbox"]').forEach(function(cb){ cb.checked = false; });
  window.updateCountryDisplay();
  document.getElementById('f-secstaff').value = 0;
  document.getElementById('f-internalsoc').value = 'no';
  document.getElementById('f-mssp').value = 'no';
  document.querySelectorAll('#compliance-pills .pill').forEach(function(p){ p.classList.remove('on'); });
  var fra = document.getElementById('fra-warning');
  if (fra) fra.style.display = 'none';
  window.updateRecommendation();
  document.getElementById('f-hot').value = 30;
  document.getElementById('f-cold').value = 90;
  document.getElementById('f-eps').value = 0;
  document.getElementById('f-notes').value = '';
  window.generateSites();
  window.showPage('page-general');
  window.setNavActive('nav-general');
}

window.onSitesChange = function() { window.generateSites(); }
window.goToFirstSite = function() {
  window.generateSites();
  window.showPage('page-sites');
  window.setNavActive(null);
}

window.showResults = function() {
  var company = document.getElementById('f-company').value || '';
  document.getElementById('res-title').textContent = (company?company+"'s ":'')+'PurpleSOC estimate';

  var grand = window.totalLDS();
  var grandEPS = window.totalEPS();
  var epsOvr = parseFloat(document.getElementById('f-eps').value)||0;
  var eps = epsOvr>0?epsOvr:(grandEPS>0?grandEPS:grand*40);
  var hot  = parseInt(document.getElementById('f-hot').value)||30;
  var cold = parseInt(document.getElementById('f-cold').value)||90;
  var hotGB  = (eps*0.5*86400*hot)/(1024*1024*1024)*1024;
  var coldGB = (eps*0.5*86400*cold)/(1024*1024*1024)*1024;
  var bufGB  = (hotGB+coldGB)*1.25;

  document.getElementById('res-lds').textContent     = grand;
  document.getElementById('res-eps').textContent     = Math.round(eps).toLocaleString();
  document.getElementById('res-storage').textContent = window.fmtSz(bufGB);
  document.getElementById('res-hero-sub').textContent =
    grand+' LDS across '+window.numSites+' site(s). '+hot+'d indexed + '+cold+'d archive.';

  var tHtml = '<tr><th>Site</th><th>LDS</th><th>Est. EPS</th></tr>';
  for (var i=0;i<window.numSites;i++) {
    var nm=document.getElementById('sname-'+i);
    var label=nm?(nm.value||'Site '+(i+1)):'Site '+(i+1);
    tHtml+='<tr><td>'+label+'</td><td class="res-td-num res-td-text">'+window.siteLDS(i)+'</td><td class="res-td-num res-td-purple">'+Math.round(window.siteEPS(i)).toLocaleString()+'</td></tr>';
  }
  tHtml+='<tr class="total-row"><td>Total</td><td class="res-td-num">'+grand+'</td><td class="res-td-num">'+Math.round(grandEPS).toLocaleString()+'</td></tr>';
  document.getElementById('res-site-table').innerHTML = tHtml;

  var socLabels={managed:'Managed SOC (hosted by PurpleGuard)',comanaged:'Co-Managed SOC (customer-hosted)',self:'Self-Managed (USO Platform)'};
  document.getElementById('res-model').textContent = socLabels[window.selectedSoc];
  var tier   = window.getTier(TIERS[window.selectedSoc], grand);
  var annual = tier.a * grand;
  var setupT = window.getTier(SETUP, grand);
  var setup  = setupT.fee * grand;
  document.getElementById('res-tier').innerHTML    = '<span class="badge-p">'+tier.sku+'</span>';
  document.getElementById('res-annual').textContent  = window.fmt(annual)+' / year';
  document.getElementById('res-monthly').textContent = window.fmt(annual/10)+' / month';
  document.getElementById('res-setup').textContent   = window.fmt(setup);
  document.getElementById('res-year1').textContent   = window.fmt(annual+setup);

  var specCard  = document.getElementById('res-spec-card');
  var specBlock = document.getElementById('res-spec-block');
  if (window.selectedSoc==='managed') {
    specCard.style.display='none';
  } else {
    specCard.style.display='block';
    var sp=window.getTier(SPECS,grand);
    var isC=sp.cpu==='Cluster';
    var ok=bufGB<=sp.baseGB;
    var sb=isC?'<span class="badge-p">Cluster — contact PurpleGuard</span>'
              :(ok?'<span class="badge-g">Base spec sufficient</span>':'<span class="badge-a">Upgrade to '+window.fmtSz(bufGB)+'</span>');
    specBlock.innerHTML=
      '<div class="res-row"><span class="res-key">CPU</span><span class="res-val">'+sp.cpu+'</span></div>'+
      '<div class="res-row"><span class="res-key">RAM</span><span class="res-val">'+sp.ram+'</span></div>'+
      '<div class="res-row"><span class="res-key">Base storage</span><span class="res-val">'+sp.lbl+'</span></div>'+
      '<div class="res-row"><span class="res-key">Required storage</span><span class="res-val">'+(isC?'Cluster':window.fmtSz(bufGB))+' &nbsp;'+sb+'</span></div>'+
      '<div class="res-row"><span class="res-key">EPS capacity</span><span class="res-val">'+sp.eps+'</span></div>'+
      '<div class="res-row"><span class="res-key">Architecture</span><span class="res-val">'+(isC?'Active-Active cluster':'Single dedicated server')+'</span></div>';
  }

  window.setNavActive('nav-results');
  window.showPage('page-results');
}

window.openQuote = function() {
  var company  = document.getElementById('f-company').value  || '—';
  var name     = document.getElementById('f-name').value     || '—';
  var email    = document.getElementById('f-email').value    || '—';
  var sites    = window.numSites;
  var industry = window.getIndustryValue();
  var country  = window.getCountryValue();
  var staff    = document.getElementById('f-secstaff').value || '0';
  var intSoc   = document.getElementById('f-internalsoc').value;
  var mssp     = document.getElementById('f-mssp').value;
  var hot      = document.getElementById('f-hot').value  || '30';
  var cold     = document.getElementById('f-cold').value || '90';
  var epsOvr   = document.getElementById('f-eps').value  || '0';
  var notes    = document.getElementById('f-notes').value || '—';

  var socMap   = {managed:'Managed SOC (hosted by PurpleGuard)',comanaged:'Co-Managed SOC (customer-hosted)',self:'Self-Managed (USO Platform)'};
  var intMap   = {no:'No internal SOC',partial:'Partial (1–2 people)',yes:'Yes, dedicated team'};
  var compliance = [];
  document.querySelectorAll('#compliance-pills .pill.on').forEach(function(p){ compliance.push(p.textContent.trim()); });

  var grand    = window.totalLDS();
  var grandEPS = window.totalEPS();
  var eps      = parseFloat(epsOvr)>0?parseFloat(epsOvr):(grandEPS>0?grandEPS:grand*40);
  var hotGB    = (eps*0.5*86400*parseInt(hot))/(1024*1024*1024)*1024;
  var coldGB   = (eps*0.5*86400*parseInt(cold))/(1024*1024*1024)*1024;
  var bufGB    = (hotGB+coldGB)*1.25;
  var tier     = window.getTier(TIERS[window.selectedSoc], grand);
  var annual   = tier.a * grand;
  var setupT   = window.getTier(SETUP, grand);
  var setup    = setupT.fee * grand;

  var siteSection = '';
  for (var i=0;i<window.numSites;i++) {
    var nm=document.getElementById('sname-'+i);
    var siteName=nm?(nm.value||'Site '+(i+1)):'Site '+(i+1);
    siteSection += '\\n  '+siteName+' — '+window.siteLDS(i)+' LDS / ~'+Math.round(window.siteEPS(i))+' EPS\\n';
    DEVICES.forEach(function(d) {
      var yb=document.getElementById('y-'+i+'-'+d.id);
      if (yb&&yb.classList.contains('on')) {
        var cnt=document.getElementById('c-'+i+'-'+d.id).value||0;
        siteSection+='    - '+d.name+': '+cnt+' unit(s) = '+window.devLDS(i,d)+' LDS\\n';
      }
    });
  }

  var body =
'PurpleSOC Discovery Questionnaire\\n'+
'===================================\\n\\n'+
'CONTACT INFORMATION\\n'+
'-------------------\\n'+
'Name:        '+name+'\\n'+
'Email:       '+email+'\\n'+
'Company:     '+company+'\\n'+
'Industry:    '+industry+'\\n'+
'Country:     '+country+'\\n'+
'Sites:       '+sites+'\\n\\n'+
'TEAM & SOC SETUP\\n'+
'----------------\\n'+
'Security staff:      '+staff+'\\n'+
'Internal SOC:        '+(intMap[intSoc]||intSoc)+'\\n'+
'Current MSSP:        '+(mssp==='yes'?'Yes':'No')+'\\n'+
'Compliance:          '+(compliance.length?compliance.join(', '):'None specified')+'\\n'+
'Preferred model:     '+(socMap[window.selectedSoc]||window.selectedSoc)+'\\n\\n'+
'DEVICE INVENTORY (PER SITE)\\n'+
'---------------------------'+siteSection+'\\n'+
'AGGREGATE SIZING\\n'+
'----------------\\n'+
'Total LDS:           '+grand+'\\n'+
'Est. EPS (typical):  '+Math.round(eps).toLocaleString()+'\\n'+
'Hot retention:       '+hot+' days\\n'+
'Cold retention:      '+cold+' days\\n'+
'Storage required:    '+window.fmtSz(bufGB)+'\\n\\n'+
'INDICATIVE PRICING (Logsign)\\n'+
'-----------------------------\\n'+
'SKU:             '+tier.sku+'\\n'+
'Annual:          $'+Math.round(annual).toLocaleString()+'\\n'+
'Monthly:         $'+Math.round(annual/10).toLocaleString()+'\\n'+
'Setup (one-time):$'+Math.round(setup).toLocaleString()+'\\n'+
'Total year 1:    $'+Math.round(annual+setup).toLocaleString()+'\\n\\n'+
'ADDITIONAL NOTES\\n'+
'----------------\\n'+
notes+'\\n\\n'+
'---\\nSubmitted via PurpleSOC Discovery Questionnaire — purpleguard.io';

  var subj = 'PurpleSOC Quote Request — '+company;
  var addr = ['h','e','l','l','o'].join('')+'@'+'purpleguard.io';
  window.location.href = 'ma'+'ilto:'+addr+'?subject='+encodeURIComponent(subj)+'&body='+encodeURIComponent(body);
}

window.toggleCountryDropdown = function() {
  var panel   = document.getElementById('country-panel');
  var trigger = document.getElementById('country-trigger');
  var isOpen  = panel.classList.contains('open');
  panel.classList.toggle('open', !isOpen);
  trigger.setAttribute('aria-expanded', String(!isOpen));
}
window.updateCountryDisplay = function() {
  var checked  = document.querySelectorAll('#country-panel input[type="checkbox"]:checked');
  var selected = Array.from(checked).map(function(cb){ return cb.value; });
  var display  = document.getElementById('country-display');
  if (selected.length) {
    display.textContent = selected.join(', ');
    display.classList.remove('placeholder');
  } else {
    display.textContent = 'Select country';
    display.classList.add('placeholder');
  }
}
window.getCountryValue = function() {
  var checked = document.querySelectorAll('#country-panel input[type="checkbox"]:checked');
  var selected = Array.from(checked).map(function(cb){ return cb.value; });
  return selected.length ? selected.join(', ') : '—';
}
window.__pgsocDocClick = function(e) {
  var dropdown = document.getElementById('country-dropdown');
  if (dropdown && !dropdown.contains(e.target)) {
    var p = document.getElementById('country-panel');
    var t = document.getElementById('country-trigger');
    if (p) p.classList.remove('open');
    if (t) t.setAttribute('aria-expanded', 'false');
  }
};
document.addEventListener('click', window.__pgsocDocClick);

window.toggleIndustryOther = function() {
  var sel = document.getElementById('f-industry');
  var otherInput = document.getElementById('f-industry-other');
  otherInput.style.display = sel.value === 'Other' ? 'block' : 'none';
  if (sel.value !== 'Other') otherInput.value = '';
}

window.sanitizeText = function(str) {
  return str.replace(/<[^>]*>/g, '').replace(/[&<>"'\`]/g, function(c) {
    return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;','\`':'&#96;'}[c];
  }).trim();
}

window.getIndustryValue = function() {
  var sel = document.getElementById('f-industry');
  if (sel.value === 'Other') {
    var custom = window.sanitizeText(document.getElementById('f-industry-other').value);
    return custom ? 'Other: ' + custom : 'Other';
  }
  return sel.value || '—';
}

window.generateSites();
window.updateRecommendation();
window.setNavActive('nav-general');
`;

export default function QuestionnaireClient() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.id = "pgsoc-questionnaire-script";
    script.text = SCRIPT_BODY;
    document.body.appendChild(script);

    return () => {
      const existing = document.getElementById("pgsoc-questionnaire-script");
      if (existing) existing.remove();
      const w = window as unknown as { __pgsocDocClick?: (e: Event) => void };
      if (w.__pgsocDocClick) {
        document.removeEventListener("click", w.__pgsocDocClick);
        delete w.__pgsocDocClick;
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pgsoc-root"
      dangerouslySetInnerHTML={{ __html: BODY_HTML }}
    />
  );
}
