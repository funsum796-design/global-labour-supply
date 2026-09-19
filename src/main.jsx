import React,{useState,useEffect}from"react";
import{createRoot}from"react-dom/client";
import{BrowserRouter,Routes,Route,Link,NavLink,useLocation,Navigate}from"react-router-dom";
import"./styles.css";

const A="https://images.unsplash.com/";
const pics={
hero:A+"photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=85",
city:A+"photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1400&q=85",
worker:A+"photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=85",
team:A+"photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=85",
hands:A+"photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=85"
};
const links=[["Home","/"],["About Us","/about"],["Services","/services"],["Hire Labour","/hire-labour"],["For Workers","/workers"],["Our Process","/process"],["Why Us","/why-us"],["Contact Us","/contact"]];
function LanguageTranslator(){
  const languages=[
    ["en","English"],["ur","اردو"],["ar","العربية"],["hi","हिन्दी"],["pa","ਪੰਜਾਬੀ"],
    ["bn","বাংলা"],["zh-CN","中文"],["fr","Français"],["de","Deutsch"],["es","Español"],
    ["pt","Português"],["ru","Русский"],["tr","Türkçe"],["fa","فارسی"],["ja","日本語"],["ko","한국어"]
  ];
  const [selected,setSelected]=useState(()=>localStorage.getItem("gls-language")||"en");
  useEffect(()=>{
    // English is always the default. Translation starts only after the visitor chooses.
    if(!localStorage.getItem("gls-language")){
      document.cookie="googtrans=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
      document.cookie="googtrans=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain="+location.hostname;
    }
    window.googleTranslateElementInit=()=>{
      if(window.google?.translate?.TranslateElement){
        new window.google.translate.TranslateElement({
          pageLanguage:"en",
          includedLanguages:"ur,ar,hi,pa,bn,zh-CN,fr,de,es,pt,ru,tr,fa,ja,ko",
          autoDisplay:false,
          layout:window.google.translate.TranslateElement.InlineLayout.SIMPLE
        },"google_translate_element");
      }
    };
    if(!window.google?.translate?.TranslateElement){
      const old=document.getElementById("gls-google-script");
      if(!old){
        const script=document.createElement("script");
        script.id="gls-google-script";
        script.src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async=true;
        document.body.appendChild(script);
      }
    } else window.googleTranslateElementInit();
    const hide=()=>{
      document.documentElement.style.top="0px";
      document.body.style.top="0px";
      document.querySelectorAll("iframe.goog-te-banner-frame, .goog-te-banner-frame, body > .skiptranslate").forEach(el=>el.style.display="none");
    };
    const obs=new MutationObserver(hide); obs.observe(document.documentElement,{childList:true,subtree:true,attributes:true}); hide();
    return()=>obs.disconnect();
  },[]);
  const changeLanguage=(lang)=>{
    setSelected(lang);
    if(lang==="en"){
      localStorage.removeItem("gls-language");
      document.cookie="googtrans=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
      document.cookie="googtrans=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain="+location.hostname;
      window.location.reload();
      return;
    }
    // Google Translate applies reliably on page load when its language cookie is set.
    // We only set this cookie after the visitor explicitly chooses a language.
    localStorage.setItem("gls-language",lang);
    const value="/en/"+lang;
    document.cookie="googtrans="+value+";path=/";
    document.cookie="googtrans="+value+";path=/;domain="+location.hostname;
    window.location.reload();
  };
  return <div className="language-switcher notranslate" translate="no" title="Change language">
    <span className="language-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 3.5 5.5 3.5 9S14.5 19.5 12 21c-2.5-1.5-3.5-4.5-3.5-9S9.5 5.5 12 3z"/></svg></span>
    <select className="notranslate" translate="no" aria-label="Change language" value={selected} onChange={e=>changeLanguage(e.target.value)}>
      {languages.map(([code,name])=><option key={code} value={code} translate="no">{name}</option>)}
    </select>
    <div id="google_translate_element" aria-hidden="true"></div>
  </div>;
}
function Header(){return <header><Link to="/" className="logo"><span className="mark">✦</span><span>GLOBAL LABOUR<small>SUPPLY</small></span></Link><nav>{links.map(([x,p])=><NavLink key={x} to={p} end={p==="/"}>{x}</NavLink>)}<LanguageTranslator/><Link className="topbtn" to="/hire-labour">Request Labour →</Link></nav></header>}
function Footer(){return <footer><div className="footgrid"><div><Link to="/" className="logo"><span className="mark">✦</span><span>GLOBAL LABOUR<small>SUPPLY</small></span></Link><p>Reliable workforce solutions connecting employers with capable labour for Saudi Arabia and the UAE.</p></div><div><b>Company</b><Link to="/about">About Us</Link><Link to="/services">Services</Link><Link to="/process">Our Process</Link></div><div><b>For You</b><Link to="/hire-labour">Hire Labour</Link><Link to="/workers">Workers</Link><Link to="/worker-application">Apply</Link></div><div><b>Markets</b><Link to="/saudi-arabia">Saudi Arabia</Link><Link to="/uae">UAE</Link><Link to="/workforce">Workforce</Link></div><div><b>Contact</b><p>+966 50 123 4567<br/>+971 50 123 4567<br/>info@globallaboursupply.com</p></div></div><div className="copyright">© 2026 Global Labour Supply <span>Privacy · Terms · Compliance</span></div></footer>}
function ScrollToTop(){
  const {pathname} = useLocation();
  React.useEffect(() => {
    window.scrollTo({top: 0, left: 0, behavior: "auto"});
  }, [pathname]);
  return null;
}
function Layout({children}){return <><Header/><main>{children}</main><Footer/></>}
const services=["General Labour","Skilled Labour","Construction Workers","Factory Workers","Warehouse & Logistics","Hospitality Staff","Cleaning Staff","Security Guards","Agriculture Labour","Other Categories"];
const icons=["◉","⚒","⌂","▦","◫","♨","✦","♜","⌁","✚"];
function Hero({tag,title,text,image=pics.hero,children}){return <section className="hero" style={{backgroundImage:`linear-gradient(90deg,#031223 4%,rgba(3,18,35,.94) 35%,rgba(3,18,35,.34)),url(${image})`}}><div className="wrap"><span className="gold">{tag}</span><h1 dangerouslySetInnerHTML={{__html:title}}/><p>{text}</p><div className="actions">{children}</div></div></section>}
function Stats(){return <div className="stats"><div><b>500+</b><span>Trusted Companies</span></div><div><b>10,000+</b><span>Workers Deployed</span></div><div><b>100%</b><span>Verified & Screened</span></div><div><b>15+</b><span>Source Countries</span></div><div><b>24/7</b><span>Support</span></div></div>}
function Section({tag,title,children}){return <section className="section"><div className="wrap"><div className="sectitle"><span>{tag}</span><h2>{title}</h2></div>{children}</div></section>}
function ServiceGrid({limit=10}){return <div className="servicegrid">{services.slice(0,limit).map((x,i)=><div className="servicecard" key={x}><div className="round">{icons[i]}</div><h3>{x}</h3><p>Dependable workforce matched to your operational requirements.</p><Link to="/hire-labour">Learn More →</Link></div>)}</div>}
function Steps(){return <div className="timeline">{["Requirement","Verification","Candidate Sourcing","Screening & Testing","Documentation","Final Approval","Deployment","After Arrival Support"].map((x,i)=><div className="tstep" key={x}><span>{String(i+1).padStart(2,"0")}</span><div><b>{x}</b><p>Clear coordination and communication at this stage.</p></div></div>)}</div>}
function MarketCards(){return <div className="markets"><Link to="/saudi-arabia" style={{backgroundImage:`linear-gradient(90deg,rgba(2,16,31,.9),rgba(2,16,31,.2)),url(${pics.city})`}}><b>Saudi Arabia</b><span>Powering industries. Building the future.</span><strong>Learn More →</strong></Link><Link to="/uae" style={{backgroundImage:`linear-gradient(90deg,rgba(2,16,31,.9),rgba(2,16,31,.2)),url(${pics.city})`}}><b>United Arab Emirates</b><span>Building tomorrow's teams.</span><strong>Learn More →</strong></Link></div>}
function CTA(){return <div className="cta"><div><span className="gold">NEED RELIABLE LABOUR?</span><h2>Let's build your workforce.</h2><p>Tell us what you need and we'll help you plan the right people.</p></div><Link className="goldbtn" to="/hire-labour">Request Labour Now →</Link></div>}

function Home(){return <Layout><Hero tag="GLOBAL LABOUR SUPPLY" title={"Reliable Labour.<br/><em>Stronger Businesses.</em><br/>Better Futures."} text="We supply skilled and general labour to businesses in Saudi Arabia and UAE through a structured, transparent recruitment process."><Link className="goldbtn" to="/hire-labour">Hire Labour →</Link><Link className="outlinebtn" to="/workers">For Workers →</Link></Hero><div className="wrap"><Stats/></div><Section tag="OUR SERVICES" title={"We Provide All Types of Labour"}><ServiceGrid/></Section><Section tag="WHY CHOOSE GLOBAL LABOUR SUPPLY?" title="Built around trust, transparency and results."><div className="whygrid">{["Verified Workforce","Transparent Process","Legal & Compliant","Dedicated Support"].map((x,i)=><div className="whycard" key={x}><span>{String(i+1).padStart(2,"0")}</span><h3>{x}</h3><p>Every engagement follows a defined process so employers know what happens next.</p></div>)}</div></Section><Section tag="HOW IT WORKS" title="Simple Steps. Strong Connections."><Steps/></Section><Section tag="OUR MARKETS" title="We Supply Labour to"><MarketCards/></Section><Section tag="INDUSTRIES WE SERVE" title="Workforce built for demanding industries."><div className="industrygrid">{["Construction","Manufacturing","Logistics","Hospitality","Retail","Agriculture","Facilities","Maintenance","Warehousing"].map((x,i)=><div key={x}><span>0{i+1}</span><h3>{x}</h3><p>Flexible workforce solutions aligned with operational requirements.</p></div>)}</div></Section><Section tag="SOURCE COUNTRIES" title="A connected regional workforce network."><div className="countrychips">{["Pakistan","India","Bangladesh","Nepal","Philippines","Sri Lanka","Egypt","Indonesia","Kenya","Ethiopia"].map(x=><span key={x}>{x}</span>)}</div></Section><Section tag="WORKFORCE HIGHLIGHTS" title="People prepared for the job, not just the vacancy."><div className="leadstats"><b>10K+<small>Workers Deployed</small></b><b>15+<small>Source Countries</small></b><b>100%<small>Screening Process</small></b><b>24/7<small>Support</small></b></div></Section><Section tag="EMPLOYERS & WORKERS" title="Are You an Employer or a Worker?"><div className="twopanels"><Link to="/hire-labour"><span>HIRE LABOUR</span><h3>Need reliable people?</h3><p>Submit your workforce requirement and let us build the right request.</p></Link><Link to="/workers"><span>FOR WORKERS</span><h3>Looking for opportunity?</h3><p>Explore categories and submit your worker application.</p></Link></div></Section><Section tag="WHAT OUR CLIENTS SAY" title="Trusted by businesses."><div className="reviews">{["Construction Partner","Industrial Client","Facilities Client"].map((x,i)=><div className="review" key={x}><div>★★★★★</div><p>“Clear communication and a structured workforce process made the engagement easy.”</p><b>{x}</b></div>)}</div></Section><Section tag="FAQ" title="Frequently Asked Questions"><div className="faq">{["How do I request labour?","Which countries do you supply?","What labour categories are available?","How does screening work?","Can I request a specific number of workers?"].map(x=><details key={x}><summary>{x}<span>+</span></summary><p>Submit the request form and our team will contact you to confirm the workforce requirement.</p></details>)}</div></Section><Section tag="WHY HIRE THE RIGHT LABOUR?" title="The right workforce changes the operation."><div className="reviews">{["Reliable manpower","Faster hiring","Better continuity"].map(x=><div className="review stars" key={x}><div>★★★★★</div><h3>{x}</h3><p>Structured sourcing, screening and deployment support.</p></div>)}</div></Section><CTA/></Layout>}

function About(){return <Layout><Hero tag="ABOUT US" title={"Connecting People.<br/><em>Creating Opportunities.</em>"} text="We connect employers with dependable workforce solutions through a clear, professional recruitment journey." image={pics.hands}><Link className="goldbtn" to="/hire-labour">Work With Us →</Link></Hero><Section tag="OUR STORY" title="A simple purpose: connect capability with opportunity."><div className="split"><div><p className="lead">Global Labour Supply is designed around two needs: employers need dependable people, and workers need legitimate opportunities.</p><p>Our role is to manage the connection through requirement gathering, sourcing, screening, documentation, deployment and support.</p></div><img src={pics.team}/></div></Section><Section tag="OUR SERVICES" title="What we bring to the relationship."><ServiceGrid limit={6}/></Section><Section tag="SOURCE COUNTRIES" title="Countries We Source From"><div className="countrychips">{["Pakistan","India","Bangladesh","Nepal","Philippines","Sri Lanka","Egypt","Indonesia"].map(x=><span key={x}>{x}</span>)}</div></Section><Section tag="GLOBAL PRESENCE" title="Markets we serve."><MarketCards/></Section><Section tag="LEADERSHIP & EXPERIENCE" title="Built for long-term workforce partnerships."><div className="leadstats"><b>10+<small>Years Experience</small></b><b>500+<small>Partner Companies</small></b><b>10,000+<small>Placements</small></b><b>100%<small>Process Focused</small></b></div></Section><CTA/></Layout>}

function WhyUs(){return <Layout><Hero tag="WHY CHOOSE US" title={"Workforce You Can Trust.<br/><em>Support You Can Rely On.</em>"} text="We combine verified workforce, transparent processes and dedicated support to make labour supply simpler for employers." image={pics.team}><Link className="goldbtn" to="/hire-labour">Work With Us →</Link></Hero><Section tag="WHY GLOBAL LABOUR SUPPLY" title="Built around trust, transparency and results."><div className="whygrid">{["Verified Workforce","Transparent Process","Legal & Compliant","Dedicated Support","Flexible Workforce","Regional Expertise","Clear Communication","After-Arrival Support"].map((x,i)=><div className="whycard" key={x}><span>{String(i+1).padStart(2,"0")}</span><h3>{x}</h3><p>Our demo workflow is designed to keep requirements, candidates and deployment steps clear and professionally coordinated.</p></div>)}</div></Section><Section tag="OUR COMMITMENT" title="A better experience for employers and workers."><div className="twopanels"><div><span>FOR EMPLOYERS</span><h3>Less uncertainty.</h3><p>Clear requirements, candidate screening and structured coordination from request to deployment.</p></div><div><span>FOR WORKERS</span><h3>More transparency.</h3><p>A clear application journey with defined steps and communication throughout the process.</p></div></div></Section><CTA/></Layout>}

function Services(){return <Layout><Hero tag="OUR SERVICES" title={"Complete Labour Solutions<br/><em>for Every Industry.</em>"} text="Choose the labour category that matches your business requirements." image={pics.city}><Link className="goldbtn" to="/hire-labour">Request Labour →</Link></Hero><Section tag="OUR LABOUR CATEGORIES" title="The people your operation needs."><ServiceGrid/></Section><Section tag="INDUSTRIES WE SERVE" title="Built for real-world operations."><div className="industrygrid">{["Construction","Manufacturing","Logistics","Hospitality","Retail","Agriculture","Facilities","Maintenance","Warehousing"].map(x=><div key={x}><span>✦</span><h3>{x}</h3><p>Workforce solutions tailored to operational demand.</p></div>)}</div></Section><Section tag="CUSTOM WORKFORCE SOLUTIONS" title="Need something specific?"><CTA/></Section></Layout>}

function RequestForm({worker=false}){
 const fields=worker?["Full Name","Email Address","Phone / WhatsApp","Nationality","Current Country","Preferred Destination","Job Category","Skills / Trade","Years of Experience","Passport Number","Languages","CV / Experience Summary","Additional Information"]:["Company Name","Contact Person","Email Address","Phone / WhatsApp","Destination Country","City","Labour Category","Number of Workers","Required Skills / Experience","Monthly Salary Range","Contract Duration","Accommodation","Transportation","Required Start Date","Job Description / Requirements"];
 const [data,setData]=useState({}); const [files,setFiles]=useState({}); const [msg,setMsg]=useState("");
 const fileNames=worker?["CV / Resume","Passport Copy","Profile Photo","Certificates / Trade Documents"]:["Company Documents / Trade License","Labour Requirement Document","Other Supporting Documents"];
 const readFile=file=>new Promise((resolve,reject)=>{if(file.size>4*1024*1024)return reject(new Error("Each file must be 4 MB or smaller."));const r=new FileReader();r.onload=()=>resolve({name:file.name,type:file.type,data:r.result});r.onerror=reject;r.readAsDataURL(file)});
 const send=async e=>{e.preventDefault();setMsg("Preparing secure submission...");try{const encoded={};for(const [k,v] of Object.entries(files)){if(v)encoded[k]=await readFile(v)};setMsg("Sending...");const r=await fetch("/api/submit",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type:worker?"Worker Application":"Employer Labour Request",data,files:encoded})});const j=await r.json();setMsg(j.message);if(j.ok){setData({});setFiles({});e.target.reset()}}catch(err){setMsg("Server connection failed. Please try again.")}};
 return <Layout><Hero tag={worker?"WORKER APPLICATION":"HIRE LABOUR / WORKFORCE REQUEST"} title={worker?"Pre-Verified. Skilled.<br/><em>Ready to Work.</em>":"Need Reliable Labour?<br/><em>We'll Provide the Right Workforce.</em>"} text={worker?"Submit your profile, experience and documents for review and suitable workforce opportunities.":"Tell us exactly what your business needs. Our team will review the requirement, source suitable candidates and coordinate the next steps."} image={worker?pics.worker:pics.city}><a className="goldbtn" href="#form">Start Application ↓</a></Hero>
 <section className="formarea" id="form"><div className="wrap formwrap"><div className="formintro"><span className="gold">{worker?"WORKER REGISTRATION":"EMPLOYER WORKFORCE REQUEST"}</span><h2>{worker?"Build Your Profile":"Tell Us What You Need"}</h2><p className="muted">All submitted information is routed to the business owner for review. Documents can be attached directly to this request.</p><div className="formsteps">{(worker?["Personal Info","Experience","Documents","Review","Submit"]:["Company Info","Workforce Need","Documents","Review","Submit"]).map((x,i)=><div key={x}><b>0{i+1}</b><span>{x}</span></div>)}</div></div>
 <form className="bigform" onSubmit={send}><h3>{worker?"Worker Profile":"Company & Workforce Requirement"}</h3><div className="fields">{fields.map(f=><label key={f} className={/Description|Summary|Additional/.test(f)?"wide":""}>{f}<input required={!/Additional|CV/.test(f)} value={data[f]||""} onChange={e=>setData({...data,[f]:e.target.value})} placeholder={`Enter ${f.toLowerCase()}`}/></label>)}
 {fileNames.map(f=><label key={f} className="filefield">{f}<input type="file" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" onChange={e=>setFiles({...files,[f]:e.target.files?.[0]})}/><small>{files[f]?.name||"PDF, JPG, PNG, DOC or DOCX"}</small></label>)}</div><label className="consent"><input type="checkbox" required/> I confirm the information provided is accurate and I agree that the submitted information may be reviewed for recruitment and workforce coordination.</label><button className="goldbtn">Submit {worker?"Application":"Labour Request"} →</button>{msg&&<div className="message">{msg}</div>}</form></div></section></Layout>}

function Employers(){return <Layout><Hero tag="FOR EMPLOYERS" title={"Your Trusted Partner.<br/><em>For Better Workforces.</em>"} text="Tell us your workforce requirement and let our team coordinate the sourcing journey." image={pics.city}><Link className="goldbtn" to="/hire-labour">Request Labour →</Link></Hero><Section tag="WHY EMPLOYERS CHOOSE US" title="Workforce support designed around you."><div className="whygrid">{["Verified Workforce","Clear Requirements","Legal & Compliant","Transparent Process","Flexible Categories","Ongoing Support"].map((x,i)=><div className="whycard" key={x}><span>{String(i+1).padStart(2,"0")}</span><h3>{x}</h3><p>Professional coordination from first requirement to deployment.</p></div>)}</div></Section><Section tag="HOW TO START" title="Simple steps. Strong connections."><Steps/></Section><CTA/></Layout>}

function Workers(){return <Layout><Hero tag="FOR WORKERS" title={"Your Trusted Partner.<br/><em>For Better Opportunities.</em>"} text="Explore popular job categories and submit your profile for suitable opportunities." image={pics.team}><Link className="goldbtn" to="/worker-application">Apply Now →</Link></Hero><Section tag="POPULAR JOB CATEGORIES" title="Find your category."><ServiceGrid limit={8}/></Section><Section tag="HOW TO APPLY" title="A simple application journey."><Steps/></Section><CTA/></Layout>}

function Process(){return <Layout><Hero tag="OUR PROCESS" title={"Simple Steps.<br/><em>Strong Connections.</em>"} text="A clear eight-stage workflow from requirement to after-arrival support." image={pics.hero}><Link className="goldbtn" to="/hire-labour">Start Requirement →</Link></Hero><Section tag="01 — 08" title="How we work."><Steps/></Section><Section tag="OUR COMMITMENT" title="Clear at every stage."><div className="whygrid">{["Requirement","Verification","Sourcing","Screening","Documentation","Approval","Deployment","Support"].map((x,i)=><div className="whycard" key={x}><span>0{i+1}</span><h3>{x}</h3><p>Defined actions and communication before moving forward.</p></div>)}</div></Section><CTA/></Layout>}

function Country({uae=false}){let n=uae?"United Arab Emirates":"Saudi Arabia";return <Layout><Hero tag={uae?"UAE":"SAUDI ARABIA"} title={`${n}<br/><em>${uae?"Creating Tomorrow's Success.":"Building a Stronger Nation."}</em>`} text={`Workforce categories and employer solutions for businesses operating in ${n}.`} image={uae?pics.city:pics.hero}><Link className="goldbtn" to="/hire-labour">Request Labour →</Link></Hero><Section tag="TOP LABOUR CATEGORIES" title={`Workforce for ${n}.`}><ServiceGrid/></Section><Section tag="INDUSTRIES WE SERVE" title="Supporting growing operations."><div className="industrygrid">{["Construction","Manufacturing","Logistics","Hospitality","Retail","Agriculture","Maintenance","Facilities"].map(x=><div key={x}><span>✦</span><h3>{x}</h3><p>Reliable labour options for your operational needs.</p></div>)}</div></Section><Section tag="WHY CHOOSE US" title={`Why choose us for ${n}?`}><div className="whygrid">{["Verified candidates","Clear documentation","Structured sourcing","Deployment coordination","Ongoing support","Dedicated communication"].map((x,i)=><div className="whycard" key={x}><span>0{i+1}</span><h3>{x}</h3><p>Designed to keep workforce coordination clear and professional.</p></div>)}</div></Section><CTA/></Layout>}

function Workforce(){const [candidates,setCandidates]=useState([]);const [loading,setLoading]=useState(true);useEffect(()=>{fetch("/api/submissions?type=Worker%20Application").then(r=>r.json()).then(j=>{setCandidates(j.items||[]);setLoading(false)}).catch(()=>setLoading(false))},[]);return <Layout><Hero tag="OUR WORKFORCE / CANDIDATES" title={"Pre-Verified. Skilled.<br/><em>Ready to Work.</em>"} text="Browse available workforce profiles submitted through our recruitment system." image={pics.team}><Link className="goldbtn" to="/hire-labour">Request Selected Candidates →</Link></Hero><Section tag="CANDIDATE DIRECTORY" title="Find the right profile."><div className="filters"><input placeholder="Search skill or category"/><select><option>All Categories</option>{services.map(x=><option key={x}>{x}</option>)}</select><select><option>All Countries</option><option>Pakistan</option><option>India</option><option>Bangladesh</option></select><button className="goldbtn">Search</button></div>{loading?<div className="empty">Loading candidate profiles...</div>:<div className="candidategrid">{candidates.length?candidates.map((item,i)=>{const d=item.data||{};const name=d["Full Name"]||`Candidate ${i+1}`;return <div className="candidate" key={item._id||i}><div className="avatar">{name.split(" ").map(a=>a[0]).join("").slice(0,2)}</div><div><b>{name}</b><p>{d["Job Category"]||"Workforce Category"} · {d["Years of Experience"]||"Experience not listed"} · Verified submission</p></div><span>Available</span><button className="smallgold" onClick={()=>window.location.href="/hire-labour"}>Request</button></div>}):<div className="empty">No public candidate profiles are available yet. Worker applications will appear here after they are submitted and approved.</div>}</div>}</Section><CTA/></Layout>}

function Contact(){const [d,setD]=useState({});const[m,setM]=useState("");const send=async e=>{e.preventDefault();setM("Sending...");try{const r=await fetch("/api/submit",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type:"Contact Message",data:d})});const j=await r.json();setM(j.message);if(j.ok)setD({})}catch{setM("Server connection failed.")}};return <Layout><Hero tag="CONTACT US" title={"We Are Here to<br/><em>Help You.</em>"} text="Employer request, worker application or general enquiry — send us a message." image={pics.city}/><Section tag="CONTACT DETAILS" title="Let's talk."><div className="contactgrid"><div className="contactinfo"><div><b>Saudi Arabia</b><p>Riyadh · +966 50 123 4567</p></div><div><b>UAE</b><p>Dubai · +971 50 123 4567</p></div><div><b>Email</b><p>info@globallaboursupply.com</p></div><div><b>Support</b><p>Sunday–Thursday · 9:00–18:00</p></div></div><form className="bigform" onSubmit={send}><div className="fields"><label>Name<input required value={d.Name||""} onChange={e=>setD({...d,Name:e.target.value})}/></label><label>Email<input required type="email" value={d.Email||""} onChange={e=>setD({...d,Email:e.target.value})}/></label><label>Phone<input value={d.Phone||""} onChange={e=>setD({...d,Phone:e.target.value})}/></label><label>Subject<input value={d.Subject||""} onChange={e=>setD({...d,Subject:e.target.value})}/></label><label className="wide">Message<textarea required rows="7" value={d.Message||""} onChange={e=>setD({...d,Message:e.target.value})}/></label></div><button className="goldbtn">Send Message →</button>{m&&<div className="message">{m}</div>}</form></div></Section><div className="mapfake"><div>GLOBAL LABOUR SUPPLY</div><span>⌖</span><span>⌖</span><span>⌖</span></div></Layout>}

function Admin(){
  const path=useLocation().pathname;
  const section=path.split('/')[2]||'dashboard';
  const [pass,setPass]=useState(sessionStorage.getItem('gls_admin')||'');
  const [authenticated,setAuthenticated]=useState(false);
  const [items,setItems]=useState([]);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState('');

  const load=async(nextPass=pass)=>{
    setLoading(true);setError('');
    try{
      const r=await fetch('/api/submissions',{headers:{'x-admin-password':nextPass}});
      const j=await r.json();
      if(!r.ok||!j.ok) throw new Error(j.message||'Admin authentication failed.');
      setAuthenticated(true);setItems(j.items||[]);sessionStorage.setItem('gls_admin',nextPass);
    }catch(e){setAuthenticated(false);setError(e.message||'Unable to connect to admin service.');}
    finally{setLoading(false)}
  };
  useEffect(()=>{if(pass)load(pass)},[]);

  const logout=()=>{sessionStorage.removeItem('gls_admin');setPass('');setAuthenticated(false);setItems([])};
  const updateStatus=async(id,status)=>{
    try{
      const r=await fetch('/api/submissions',{method:'PATCH',headers:{'Content-Type':'application/json','x-admin-password':pass},body:JSON.stringify({id,status})});
      const j=await r.json();if(!r.ok||!j.ok)throw new Error(j.message||'Update failed');
      load();
    }catch(e){setError(e.message)}
  };

  if(!authenticated)return <Layout><section className="adminlogin"><form className="bigform" onSubmit={e=>{e.preventDefault();load()}}><span className="gold">PRIVATE ADMIN AREA</span><h2>Admin Login</h2><p className="muted">Use the ADMIN_PASSWORD configured in your Vercel environment variables.</p><input autoFocus value={pass} type="password" placeholder="Admin password" onChange={e=>setPass(e.target.value)}/><button className="goldbtn" type="submit" disabled={loading}>{loading?'Checking...':'Sign In →'}</button>{error&&<div className="message error">{error}</div>}</form></section></Layout>;

  const workers=items.filter(x=>x.type==='Worker Application');
  const approved=workers.filter(x=>x.status==='approved');
  const pending=workers.filter(x=>x.status!=='approved'&&x.status!=='rejected');
  const requests=items.filter(x=>x.type==='Employer Labour Request');
  const messages=items.filter(x=>x.type==='Contact Message');
  const title={dashboard:'Workforce Dashboard',applications:'Worker Applications',candidates:'Candidate Profiles',requests:'Labour Requests',documents:'Documents',matching:'Candidate Matching',messages:'Messages & Notifications'}[section]||'Workforce Dashboard';
  const visible=section==='applications'?workers:section==='candidates'?approved:section==='requests'?requests:section==='messages'?messages:items;

  const renderRecord=(x,i)=>{
    const d=x.data||{};const name=d['Full Name']||d['Company Name']||d['Contact Person']||d.Name||`${x.type} #${i+1}`;
    return <details className="adminrecord" key={x._id||i}><summary><span><b>{name}</b><small>{x.type}</small></span><span><b className={`status ${x.status||'pending'}`}>{x.status||'pending'}</b><small>{new Date(x.createdAt).toLocaleString()}</small></span></summary><div className="recordbody"><div className="recordgrid">{Object.entries(d).map(([k,v])=><div key={k}><small>{k}</small><p>{String(v||'—')}</p></div>)}</div>{x.files&&Object.keys(x.files).length>0&&<div className="filelist"><b>Submitted documents</b>{Object.entries(x.files).map(([k,v])=><div key={k}>📎 {k}: {v?.name||'File'}</div>)}</div>}<div className="adminactions"><span>Status: <b className={`status ${x.status||'pending'}`}>{x.status||'pending'}</b></span>{x.type==='Worker Application'&&<><button className="smallgold" onClick={()=>updateStatus(x._id,'approved')}>Approve</button><button className="outlinebtn smalloutline" onClick={()=>updateStatus(x._id,'rejected')}>Reject</button><button className="outlinebtn smalloutline" onClick={()=>updateStatus(x._id,'pending')}>Set Pending</button></>}</div></div></details>
  };

  return <Layout><section className="admin"><div className="wrap">
    <div className="adminhead"><div><span className="gold">CONTROL CENTER</span><h1>{title}</h1><p className="muted">Manage your workforce pipeline from one private dashboard.</p></div><button className="outlinebtn" onClick={logout}>Sign Out</button><div className="adminnav">{[['dashboard','Dashboard'],['applications','Applications'],['candidates','Candidates'],['requests','Labour Requests'],['documents','Documents'],['matching','Matching'],['messages','Messages']].map(([k,label])=><Link className={section===k?'active':''} key={k} to={k==='dashboard'?'/admin':`/admin/${k}`}>{label}</Link>)}</div></div>
    {error&&<div className="message error">{error}</div>}
    {section==='dashboard'&&<>
      <div className="admstats"><div><b>{items.length}</b><span>Total records</span></div><div><b>{pending.length}</b><span>Pending workers</span></div><div><b>{approved.length}</b><span>Approved candidates</span></div><div><b>{requests.length}</b><span>Labour requests</span></div></div>
      <div className="adminquick"><Link to="/admin/applications"><b>Review Worker Applications</b><span>{pending.length} pending</span></Link><Link to="/admin/requests"><b>Review Labour Requests</b><span>{requests.length} requests</span></Link><Link to="/admin/candidates"><b>Approved Workforce</b><span>{approved.length} candidates</span></Link><Link to="/admin/matching"><b>Candidate Matching</b><span>{approved.length} approved · {requests.length} requests</span></Link></div>
      <div className="sectitle left"><span>RECENT ACTIVITY</span><h2>Latest submissions</h2></div><div className="adminlist">{items.slice(0,8).map(renderRecord)}</div>
    </>}
    {section==='applications'&&<><div className="adminfilter"><span>{workers.length} applications · {pending.length} pending · {approved.length} approved</span></div><div className="adminlist">{visible.length?visible.map(renderRecord):<div className="empty">No worker applications yet.</div>}</div></>}
    {section==='candidates'&&<><div className="adminfilter"><span>{approved.length} approved candidates are visible to employers.</span><Link className="goldbtn" to="/workforce">View Public Workforce →</Link></div><div className="adminlist">{visible.length?visible.map(renderRecord):<div className="empty">Approve worker applications to create public candidate profiles.</div>}</div></>}
    {section==='requests'&&<><div className="adminfilter"><span>{requests.length} employer labour requests</span><Link className="goldbtn" to="/hire-labour">Open Hire Labour Form →</Link></div><div className="adminlist">{visible.length?visible.map(renderRecord):<div className="empty">No labour requests yet.</div>}</div></>}
    {section==='documents'&&<div className="adminlist">{items.filter(x=>x.files&&Object.keys(x.files).length).length?items.filter(x=>x.files&&Object.keys(x.files).length).map(renderRecord):<div className="empty">No uploaded documents yet.</div>}</div>}
    {section==='messages'&&<div className="adminlist">{visible.length?visible.map(renderRecord):<div className="empty">No contact messages yet.</div>}</div>}
    {section==='matching'&&<div className="matchinggrid"><div><div className="sectitle left"><span>APPROVED WORKFORCE</span><h2>Available candidates</h2></div>{approved.length?approved.map((x,i)=>{const d=x.data||{};return <div className="matchcard" key={x._id||i}><b>{d['Full Name']||'Candidate'}</b><span>{d['Job Category']||'Category not listed'}</span><small>{d['Years of Experience']||'—'} experience · {d.Nationality||'Nationality not listed'}</small></div>}):<div className="empty">No approved candidates.</div>}</div><div><div className="sectitle left"><span>EMPLOYER REQUIREMENTS</span><h2>Open requests</h2></div>{requests.length?requests.map((x,i)=>{const d=x.data||{};return <div className="matchcard" key={x._id||i}><b>{d['Company Name']||'Company'}</b><span>{d['Labour Category']||'Category not listed'} · {d['Number of Workers']||'—'} workers</span><small>{d['Destination Country']||'Destination not listed'} · {d.City||''}</small></div>}):<div className="empty">No employer requests.</div>}</div></div>}
  </div></section></Layout>
}
function AdminPage({section}){return <Admin/>}


const DEMO_DATA={stats:{workers:1284,pending:37,approved:812,requests:64},applications:[
{id:"WA-1001",name:"Muhammad Ali",country:"Pakistan",category:"Construction Worker",experience:"6 years",status:"Pending",date:"22 Aug 2026"},
{id:"WA-1002",name:"Rahman Kumar",country:"India",category:"Warehouse Worker",experience:"4 years",status:"Approved",date:"21 Aug 2026"},
{id:"WA-1003",name:"Suresh Thapa",country:"Nepal",category:"General Labour",experience:"5 years",status:"Pending",date:"20 Aug 2026"},
{id:"WA-1004",name:"Bikash Tamang",country:"Nepal",category:"Electrician",experience:"7 years",status:"Approved",date:"19 Aug 2026"}],
requests:[
{id:"LR-2041",company:"Al Noor Contracting",country:"Saudi Arabia",category:"Construction Labour",workers:45,status:"New",date:"22 Aug 2026"},
{id:"LR-2040",company:"Gulf Facilities LLC",country:"UAE",category:"Cleaning Staff",workers:20,status:"Matching",date:"21 Aug 2026"},
{id:"LR-2039",company:"Riyadh Industrial Group",country:"Saudi Arabia",category:"General Labour",workers:60,status:"In Progress",date:"20 Aug 2026"}],
candidates:[
{id:"C-501",name:"Rahman Kumar",category:"Warehouse Worker",country:"India",experience:"4 years",availability:"Available"},
{id:"C-502",name:"Bikash Tamang",category:"Electrician",country:"Nepal",experience:"7 years",availability:"Available"},
{id:"C-503",name:"Adeel Khan",category:"Mason",country:"Pakistan",experience:"9 years",availability:"Available"},
{id:"C-504",name:"Arif Hussain",category:"Construction Worker",country:"Pakistan",experience:"8 years",availability:"Available"}],
messages:[
{id:"M-301",from:"Al Noor Contracting",subject:"45 construction workers required",status:"Unread"},
{id:"M-300",from:"Worker Application",subject:"New electrician application",status:"Unread"},
{id:"M-299",from:"Gulf Facilities LLC",subject:"Cleaning workforce request",status:"Read"}]};

const PLACEMENT_STAGES=["Selected","Offer Issued","Documentation","Visa Processing","Travel Booked","Arrived","Joined Employer"];

function DemoAdmin(){
 const [demo,setDemo]=React.useState(false);
 const [tab,setTab]=React.useState("Dashboard");
 const [query,setQuery]=React.useState("");
 const [notice,setNotice]=React.useState("");
 const [data,setData]=React.useState(()=>{try{return JSON.parse(localStorage.getItem("gls_demo_data"))||DEMO_DATA}catch{return DEMO_DATA}});
 React.useEffect(()=>{localStorage.setItem("gls_demo_data",JSON.stringify(data))},[data]);
 const enable=()=>setDemo(true);
 const reset=()=>{setData(JSON.parse(JSON.stringify(DEMO_DATA)));setQuery("");setNotice("Demo data has been reset.");};
 const approve=id=>{setData(d=>({...d,applications:d.applications.map(a=>a.id===id?{...a,status:"Approved"}:a)}));setNotice(`${id} approved successfully.`)};
 const reject=id=>{setData(d=>({...d,applications:d.applications.map(a=>a.id===id?{...a,status:"Rejected"}:a)}));setNotice(`${id} rejected.`)};
 const markRead=id=>setData(d=>({...d,messages:d.messages.map(m=>m.id===id?{...m,status:"Read"}:m)}));
 const filteredApps=data.applications.filter(a=>`${a.id} ${a.name} ${a.category} ${a.country} ${a.status}`.toLowerCase().includes(query.toLowerCase()));
 const filteredRequests=data.requests.filter(r=>`${r.id} ${r.company} ${r.category} ${r.country} ${r.status}`.toLowerCase().includes(query.toLowerCase()));
 const tabs=["Dashboard","Worker Applications","Employers","Labour Requests","Candidates","Matching","Placements","Documents","Messages","Reports","Admin Users","Audit Log","Settings"];
 const switchTab=t=>{setTab(t);setQuery("");setNotice("")};
 return <div className="admin-shell">
  <div className="demo-banner"><b>ADMIN DEMO</b><span>{demo?"Sample data is active — all changes are local to this browser.":"Complete demo — no database, Gmail or environment variables required."}</span>{demo?<><button onClick={reset}>Reset Demo</button><button onClick={()=>setDemo(false)}>Exit Demo</button></>:<button onClick={enable}>One-Click Demo Mode →</button>}</div>
  <aside className="admin-side"><Link className="admin-logo" to="/"><span className="mark">✦</span><span>GLOBAL LABOUR<small>SUPPLY</small></span></Link><div className="admin-label">ADMIN PANEL</div>
  {tabs.map(t=><button className={tab===t?"admin-nav active":"admin-nav"} onClick={()=>switchTab(t)} key={t}>{t}{t==="Messages"&&data.messages.some(m=>m.status==="Unread")?<em className="nav-badge">{data.messages.filter(m=>m.status==="Unread").length}</em>:null}</button>)}<Link className="admin-public" to="/">← View Website</Link></aside>
  <section className="admin-main"><div className="admin-top"><div><span className="gold">ADMINISTRATION</span><h1>{tab}</h1></div><div className="admin-user">Administrator <span>●</span></div></div>
  {notice&&<div className="demo-notice">✓ {notice}</div>}
  {!demo?<div className="admin-welcome"><span className="gold">QUICK TEST</span><h2>Test your complete recruitment dashboard instantly.</h2><p>Everything below is simulated and stored only in this browser. Nothing is sent to a real database.</p><button className="goldbtn" onClick={enable}>Start Demo Mode →</button><div className="demo-preview"><b>Included in demo</b><span>Workers · Employers · Applications · Matching · Placements · Documents · Messages · Reports · Audit Log</span></div></div>:
  <>
  {tab==="Dashboard"&&<><div className="admin-stats">{[["Total Workers",data.stats.workers,"+12% this month"],["Pending Applications",data.stats.pending,"Needs review"],["Approved Candidates",data.stats.approved,"Ready to match"],["Labour Requests",data.stats.requests,"18 active"]].map(x=><div className="admin-stat" key={x[0]}><span>{x[0]}</span><b>{x[1]}</b><small>{x[2]}</small></div>)}</div><div className="admin-grid2"><div className="admin-card"><div className="admin-card-head"><h3>Recent Applications</h3><span className="gold">{data.applications.length} DEMO</span></div>{data.applications.map(a=><div className="admin-row" key={a.id}><div><b>{a.name}</b><small>{a.category} · {a.country}</small></div><span className={"status "+a.status.toLowerCase()}>{a.status}</span></div>)}</div><div className="admin-card"><div className="admin-card-head"><h3>Labour Requests</h3><span className="gold">LIVE DEMO</span></div>{data.requests.map(r=><div className="admin-row" key={r.id}><div><b>{r.company}</b><small>{r.workers} workers · {r.country}</small></div><span className="status new">{r.status}</span></div>)}</div></div><div className="admin-grid3"><div className="admin-card"><h3>Quick Actions</h3><div className="quick-actions"><button onClick={()=>switchTab("Worker Applications")}>Review Applications</button><button onClick={()=>switchTab("Matching")}>Find Matches</button><button onClick={()=>switchTab("Documents")}>Verify Documents</button><button onClick={()=>switchTab("Reports")}>Open Reports</button></div></div><div className="admin-card"><h3>Notifications</h3><div className="notification-list"><div><b>2 unread messages</b><small>Employer and worker activity</small></div><div><b>37 applications pending</b><small>Recruitment team action required</small></div><div><b>18 active labour requests</b><small>Candidate matching in progress</small></div></div></div><div className="admin-card"><h3>Placement Pipeline</h3><div className="pipeline-mini">{PLACEMENT_STAGES.slice(0,5).map((x,i)=><div key={x}><b>{[18,15,12,8,5][i]}</b><small>{x}</small></div>)}</div></div></div></>}
  {tab==="Worker Applications"&&<><AdminSearch value={query} onChange={setQuery} placeholder="Search applicant, category, country..."/><AdminTable title="Worker Applications" headers={["ID","Applicant","Category","Country","Experience","Status","Action"]} rows={filteredApps.map(a=><><span>{a.id}</span><b>{a.name}</b><span>{a.category}</span><span>{a.country}</span><span>{a.experience}</span><span className={"status "+a.status.toLowerCase()}>{a.status}</span><div className="row-actions">{a.status==="Pending"&&<><button onClick={()=>approve(a.id)}>Approve</button><button onClick={()=>reject(a.id)}>Reject</button></>}</div></>)}/></>}
  {tab==="Employers"&&<><AdminSearch value={query} onChange={setQuery} placeholder="Search employer..."/><AdminTable title="Employers" headers={["ID","Company","Country","Requests","Status"]} rows={[["EMP-01","Al Noor Contracting","Saudi Arabia","3","Active"],["EMP-02","Gulf Facilities LLC","UAE","2","Active"],["EMP-03","Riyadh Industrial Group","Saudi Arabia","5","Active"],["EMP-04","Desert Horizon Services","Saudi Arabia","4","Active"]].filter(r=>r.join(" ").toLowerCase().includes(query.toLowerCase())).map(r=><>{r.map((x,i)=>i===1?<b>{x}</b>:<span>{x}</span>)}</>)}/></>}
  {tab==="Labour Requests"&&<><AdminSearch value={query} onChange={setQuery} placeholder="Search company, category, destination..."/><AdminTable title="Labour Requests" headers={["ID","Company","Country","Category","Workers","Status","Date"]} rows={filteredRequests.map(r=><><span>{r.id}</span><b>{r.company}</b><span>{r.country}</span><span>{r.category}</span><span>{r.workers}</span><span className="status new">{r.status}</span><span>{r.date}</span></>)}/></>}
  {tab==="Candidates"&&<AdminTable title="Approved Candidates" headers={["ID","Candidate","Category","Country","Experience","Availability"]} rows={data.candidates.map(c=><><span>{c.id}</span><b>{c.name}</b><span>{c.category}</span><span>{c.country}</span><span>{c.experience}</span><span className="status approved">{c.availability}</span></>)}/>
  }
  {tab==="Matching"&&<div className="admin-card full"><div className="admin-card-head"><h3>Smart Candidate Matching</h3><span className="gold">DEMO SCORING</span></div><p className="muted">Scores are simulated from category, experience, country and availability.</p>{data.requests.map(r=>{const ranked=[...data.candidates].map(c=>{let score=55;if(c.category.toLowerCase().includes(r.category.split(" ")[0].toLowerCase())||r.category.toLowerCase().includes(c.category.split(" ")[0].toLowerCase()))score+=25;if(c.country===r.country||r.country==="Saudi Arabia"&&c.country==="Pakistan")score+=10;if(c.availability==="Available")score+=10;return {...c,score:Math.min(score,99)}}).sort((a,b)=>b.score-a.score);return <div className="match-request" key={r.id}><div className="match-request-head"><div><b>{r.company}</b><small>{r.category} · {r.workers} workers · {r.country}</small></div><span className="status new">{r.status}</span></div>{ranked.slice(0,3).map(c=><div className="match-card" key={c.id}><div><b>{c.name}</b><small>{c.category} · {c.country} · {c.experience}</small></div><div className="match-score"><strong>{c.score}%</strong><small>Match</small></div><button onClick={()=>setNotice(`${c.name} shortlisted for ${r.company}.`)}>Shortlist</button></div>)}</div>})}</div>}
  {tab==="Placements"&&<div className="admin-card full"><div className="admin-card-head"><h3>Placement Tracking</h3><span className="gold">7-STAGE PIPELINE</span></div><div className="placement-pipeline">{PLACEMENT_STAGES.map((x,i)=><div className={"placement-stage "+(i<4?"done":"")} key={x}><span>{String(i+1).padStart(2,"0")}</span><b>{x}</b><small>{[18,15,12,8,5,3,2][i]} placements</small></div>)}</div><div className="admin-card inset"><h3>Active Placements</h3>{["Placement #1001 — Riyadh Industrial Group","Placement #1002 — Al Noor Contracting","Placement #1003 — Gulf Facilities LLC"].map((x,i)=><div className="admin-row" key={x}><div><b>{x}</b><small>{PLACEMENT_STAGES[i+2]} · Demo tracking</small></div><span className="status approved">In Progress</span></div>)}</div></div>}
  {tab==="Documents"&&<div className="admin-card full"><div className="admin-card-head"><h3>Document Verification</h3><span className="gold">DEMO FILES</span></div>{data.applications.map((a,i)=><div className="admin-row" key={a.id}><div><b>{a.name}</b><small>Passport · CV · Certificate · uploaded {a.date}</small></div><div className="doc-actions"><span className={"status "+(i===2?"pending":"approved")}>{i===2?"Needs Review":"Verified"}</span>{i===2&&<button onClick={()=>setNotice(`${a.name}'s documents marked verified.`)}>Verify</button>}</div></div>)}</div>}
  {tab==="Messages"&&<div className="admin-card full"><div className="admin-card-head"><h3>Messages & Notifications</h3><span className="gold">{data.messages.filter(m=>m.status==="Unread").length} UNREAD</span></div>{data.messages.map(m=><div className="admin-row" key={m.id}><div><b>{m.subject}</b><small>{m.from} · {m.id}</small></div><div className="doc-actions"><span className={"status "+m.status.toLowerCase()}>{m.status}</span>{m.status==="Unread"&&<button onClick={()=>markRead(m.id)}>Mark Read</button>}</div></div>)}</div>}
  {tab==="Reports"&&<div className="admin-grid2"><ReportCard title="Workforce by Country" data={[["Pakistan",420],["India",310],["Nepal",220],["Bangladesh",180],["Other",154]]}/><ReportCard title="Demand by Category" data={[["Construction",38],["General Labour",29],["Warehouse",18],["Cleaning",14],["Hospitality",9]]}/><div className="admin-card full"><div className="admin-card-head"><h3>Demo Report Export</h3><button className="goldbtn small-btn" onClick={()=>setNotice("Demo report prepared — no real file was uploaded.")}>Export Report →</button></div><p className="muted">In production this button can generate CSV/PDF reports. For now it demonstrates the workflow without a backend.</p></div></div>}
  {tab==="Admin Users"&&<AdminTable title="Admin Users & Roles" headers={["ID","Name","Role","Status","Last Active"]} rows={[["ADM-01","System Owner","Super Admin","Active","Today"],["ADM-02","Recruitment Manager","Recruitment","Active","Today"],["ADM-03","Document Officer","Documents","Active","Yesterday"],["ADM-04","Employer Relations","Employer Relations","Active","Yesterday"]].map(r=><>{r.map((x,i)=>i===1?<b>{x}</b>:<span>{x}</span>)}</>)}/>
  }
  {tab==="Audit Log"&&<div className="admin-card full"><div className="admin-card-head"><h3>Audit Log</h3><span className="gold">DEMO ACTIVITY</span></div>{["System Owner approved WA-1002","Recruitment Manager changed LR-2040 to Matching","Document Officer verified passport for WA-1004","Employer Relations created LR-2041","Recruitment Manager shortlisted a candidate"].map((x,i)=><div className="admin-row" key={x}><div><b>{x}</b><small>{i+1} hour(s) ago · Local demo activity</small></div><span className="status approved">Recorded</span></div>)}</div>}
  {tab==="Settings"&&<div className="admin-grid2"><div className="admin-card"><h3>Labour Categories</h3>{["General Labour","Construction","Warehouse & Logistics","Cleaning","Hospitality","Skilled Trades"].map(x=><div className="admin-row" key={x}><b>{x}</b><span className="status approved">Enabled</span></div>)}</div><div className="admin-card"><h3>Demo System Settings</h3>{["Saudi Arabia","United Arab Emirates","Gmail Notifications","Document Verification","Candidate Matching","Local Demo Storage"].map(x=><div className="admin-row" key={x}><b>{x}</b><span className="status approved">Simulated</span></div>)}</div></div>}
  </>}</section>
 </div>;
}
function AdminSearch({value,onChange,placeholder}){return <div className="admin-search"><span>⌕</span><input value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}/>{value&&<button onClick={()=>onChange("")}>Clear</button>}</div>}
function ReportCard({title,data}){const max=Math.max(...data.map(x=>x[1]));return <div className="admin-card"><h3>{title}</h3>{data.map(x=><div className="report-row" key={x[0]}><div><b>{x[0]}</b><span>{x[1]}</span></div><div className="reportbar"><span style={{width:`${(x[1]/max)*100}%`}}/></div></div>)}</div>}

function AdminTable({title,headers,rows}){return <div className="admin-card full"><div className="admin-card-head"><h3>{title}</h3><span className="gold">DEMO DATA</span></div><div className="admin-table"><div className="admin-tr admin-th">{headers.map(h=><span>{h}</span>)}</div>{rows.map((r,i)=><div className="admin-tr" key={i}>{r}</div>)}</div></div>}

function App(){return <Routes><Route path="/" element={<Home/>}/><Route path="/about" element={<About/>}/><Route path="/why-us" element={<WhyUs/>}/><Route path="/services" element={<Services/>}/><Route path="/hire-labour" element={<RequestForm/>}/><Route path="/employers" element={<Navigate to="/hire-labour" replace/>}/><Route path="/workers" element={<Workers/>}/><Route path="/worker-application" element={<RequestForm worker/>}/><Route path="/process" element={<Process/>}/><Route path="/saudi-arabia" element={<Country/>}/><Route path="/uae" element={<Country uae/>}/><Route path="/workforce" element={<Workforce/>}/><Route path="/admin" element={<DemoAdmin/>}/><Route path="/admin/applications" element={<AdminPage section="applications"/>}/><Route path="/admin/candidates" element={<AdminPage section="candidates"/>}/><Route path="/admin/requests" element={<AdminPage section="requests"/>}/><Route path="/admin/documents" element={<AdminPage section="documents"/>}/><Route path="/admin/matching" element={<AdminPage section="matching"/>}/><Route path="/admin/messages" element={<AdminPage section="messages"/>}/><Route path="/contact" element={<Contact/>}/></Routes>}
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ScrollToTop/>
    <App/>
  </BrowserRouter>
);