import React, { useState } from "react";
import Head from "next/head";
import { Inter } from "next/font/google";

const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800"],
    display: "swap",
});

const DEMO_URL = "https://forms.office.com/r/zg0U7ZmsdF";
const VIDEO_BG =
    "https://player.vimeo.com/video/1165705101?h=a4fff6404a&autoplay=1&muted=1&loop=1&background=1&controls=0&title=0&byline=0&portrait=0";
const VIDEO_PLAY =
    "https://player.vimeo.com/video/1165705101?h=a4fff6404a&autoplay=1";

type IconName =
    | "check" | "x" | "bolt" | "users" | "pin" | "invoice" | "list" | "sync"
    | "shield" | "wifi-off" | "clock" | "storm" | "network" | "swap" | "arrow";

const Icon = ({ name }: { name: IconName }) => (
    <svg aria-hidden="true">
        <use href={`#hx-${name}`} />
    </svg>
);

const Sprite = () => (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <defs>
            <symbol id="hx-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></symbol>
            <symbol id="hx-x" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></symbol>
            <symbol id="hx-bolt" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" /></symbol>
            <symbol id="hx-users" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" /></symbol>
            <symbol id="hx-pin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" /></symbol>
            <symbol id="hx-invoice" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" /></symbol>
            <symbol id="hx-list" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3 8-8" /><path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9" /></symbol>
            <symbol id="hx-sync" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 0 1-15 6.7L3 16M3 12a9 9 0 0 1 15-6.7L21 8" /><path d="M21 3v5h-5M3 21v-5h5" /></symbol>
            <symbol id="hx-shield" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></symbol>
            <symbol id="hx-wifi-off" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m1 1 22 22M16.7 11.1A11 11 0 0 1 19 12.5M5 12.5a11 11 0 0 1 5.2-2.4M10.7 5A16 16 0 0 1 22.6 9M1.4 9a16 16 0 0 1 4.3-2.7M8.5 16.1a5 5 0 0 1 7 0M12 20h.01" /></symbol>
            <symbol id="hx-clock" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></symbol>
            <symbol id="hx-storm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 16.9A5 5 0 0 0 18 7h-1.3A8 8 0 1 0 4 15.3" /><path d="m13 11-4 6h6l-4 6" /></symbol>
            <symbol id="hx-network" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="3" /><circle cx="5" cy="19" r="3" /><circle cx="19" cy="19" r="3" /><path d="M12 8v4M12 12l-5 5M12 12l5 5" /></symbol>
            <symbol id="hx-swap" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 8h15M15 4l4 4-4 4" /><path d="M20 16H5M9 12l-4 4 4 4" /></symbol>
            <symbol id="hx-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7" /></symbol>
        </defs>
    </svg>
);

const DemoLink = ({ className = "btn btn-primary", children }: { className?: string; children: React.ReactNode }) => (
    <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
    </a>
);

const painPoints = [
    "A master spreadsheet edited by many people at once",
    "40+ email threads with rosters as PDFs in different formats",
    "Whiteboards for crew counts and phone trees for status",
    "Weeks of billing disputes after the lights come back on",
];

const comparison = [
    ["Roster changes emailed as new PDFs", "Live digital rosters, visible instantly to both sides"],
    ["Crews double-booked without warning", "Automated conflict detection across all deployments"],
    ["Manual crew counts in spreadsheets", "Real-time crew count dashboards"],
    ["Paper or phone-dispatched assignments", "Digital work packages from OMS, on mobile"],
    ["Certification gaps found on-site", "Certifications checked during roster review"],
    ["No audit trail, invoice disputes", "Timestamped log and automated invoices"],
];

const audiences: { icon: IconName; tone: string; title: string; text: string }[] = [
    { icon: "bolt", tone: "", title: "Host Utilities", text: "Emergency operations, mutual aid coordinators, T&D leaders, dispatchers, field supervisors and logistics teams." },
    { icon: "swap", tone: "warn", title: "Coordination Groups", text: "Bringing together Host Utilities and Sending Utilities." },
    { icon: "users", tone: "ok", title: "Contractors & Sending Utilities", text: "Maintain crew records, respond to requests, submit rosters and update activity from the field." },
];

const utilityFeatures: { icon: IconName; tone: string; title: string; text: string }[] = [
    { icon: "list", tone: "", title: "Roster Approval in Minutes", text: "Review, approve or return contractor rosters digitally, with conflicts and certification gaps flagged automatically." },
    { icon: "sync", tone: "ok", title: "Bidirectional OMS Sync", text: "Work orders flow in, completion data flows back — production-ready today." },
    { icon: "pin", tone: "", title: "Real-time Crew Tracking", text: "Ability to see crews' location in real-time." },
    { icon: "shield", tone: "warn", title: "Defensible Records", text: "An immutable, timestamped log of every action and status change, plus invoices built from captured data." },
];

const rosterRows = [
    { name: "Contractor A", crews: "12 Overhead · 4 Digger", note: "Certs verified", tag: "ok", label: "Approved" },
    { name: "Contractor B", crews: "8 Tree · 2 Mechanic", note: "1 cert expiring", tag: "warn", label: "Check" },
    { name: "Contractor C", crews: "6 Cable Splice", note: "Crew on other event", tag: "alert", label: "Conflict" },
    { name: "Contractor D", crews: "10 Service · 3 Substation", note: "Submitted just now", tag: "b", label: "New" },
];

const contractorFeatures: { icon: IconName; tone: string; title: string; text: string }[] = [
    { icon: "list", tone: "alert", title: "Always-Ready Crew Records", text: "Keep personnel, qualifications, vehicles and equipment up to date, so you're ready to assemble crews and submit rosters when a request comes in." },
    { icon: "network", tone: "", title: "More Deployment Opportunities", text: "Being on HEXaid means being invited to more deployments, and being available for other utilities' events too." },
    { icon: "wifi-off", tone: "ok", title: "Built for Dead Zones", text: "Native iOS and Android apps keep working offline. Updates, completions and photos sync on reconnect." },
    { icon: "invoice", tone: "warn", title: "Cleaner Invoices", text: "Invoices come from the same real-time data the utility sees, so there are fewer billing disputes." },
];

const steps: { icon: IconName; tone: string; title: string; text: string }[] = [
    { icon: "bolt", tone: "alert", title: "Create & Request", text: "The host utility creates an incident and requests specific resource types and counts." },
    { icon: "list", tone: "warn", title: "Submit & Approve Rosters", text: "Contractors check availability, assemble crews and submit rosters. Conflicts and certification gaps surface before approval." },
    { icon: "pin", tone: "", title: "Onboard, Deploy & Track", text: "Share reporting instructions, documents, food and lodging details, then follow crews as they mobilize and work." },
    { icon: "invoice", tone: "ok", title: "Complete & Invoice", text: "Completion data syncs back to OMS and invoices are generated from what was actually captured." },
];

const stages: [string, string][] = [
    ["alert", "Incident Declaration"],
    ["alert", "Deployment Request"],
    ["warn", "Availability Campaign"],
    ["warn", "Request Distribution"],
    ["warn", "Roster Building"],
    ["warn", "Roster Submission & Review"],
    ["warn", "Approval"],
    ["b", "Auto-Operation Creation"],
    ["b", "Mobilization"],
    ["b", "Arrival & Onboarding"],
    ["b", "Work Execution"],
    ["ok", "Demobilization"],
    ["ok", "Completion & Billing"],
];

const phases: { icon: IconName; tone: string; title: string; text: string }[] = [
    { icon: "list", tone: "ok", title: "Before: Be Ready", text: "Contractors keep personnel, qualifications, vehicles, equipment and contacts current, so nothing has to be gathered from scratch when a storm hits." },
    { icon: "storm", tone: "alert", title: "During: Mobilize and Manage", text: "Request resources, approve rosters, onboard crews and track status, travel, assignments and logistics as the response moves." },
    { icon: "clock", tone: "", title: "After: Review the Record", text: "Review the event timeline, activity and supporting records — a clear account of who did what, and when." },
];

const questions: { q: string; lead: string; rest: string }[] = [
    { q: "Do contractor rosters still arrive as PDFs and email attachments, each in a different format?", lead: "HEXaid replaces them with live digital rosters.", rest: " Contractors submit, you approve, and changes are visible to both sides instantly." },
    { q: "Has a crew ever been double-booked, the wrong type, or missing a certification when it arrived?", lead: "HEXaid catches it before approval.", rest: " Conflicts across deployments and certification gaps are flagged during roster review." },
    { q: "Does it take hours to get from a deployment request to crews heading to the field?", lead: "HEXaid compresses that cycle from hours to minutes", rest: ", with requests, availability, rosters and approvals in one workflow." },
    { q: "Are your field supervisors still phoning in status updates?", lead: "HEXaid puts status in the mobile app.", rest: " Updates and arrival locations flow straight to your EOC, even after an offline stretch." },
    { q: "Is it hard to know which contractors are ready before the next event?", lead: "HEXaid keeps readiness current year-round.", rest: " Contractors maintain personnel, qualifications, vehicles and equipment on the platform." },
    { q: "Do food, lodging and reporting instructions get lost across calls and email chains?", lead: "HEXaid keeps logistics with the response.", rest: " Share documents, reporting instructions, and food and lodging details in one place." },
    { q: "Does post-event billing turn into weeks of reconciliation and disputes?", lead: "HEXaid generates invoices from data captured in real time", rest: ", so both sides are working from the same record." },
    { q: "Are you measured on restoration metrics like CAIDI and SAIDI?", lead: "HEXaid gives time back to restoration.", rest: " Less time coordinating means crews reach the field sooner — with a timestamped record of who did what, and when." },
];

const stormCards: { icon: IconName; title: string; text: string }[] = [
    { icon: "storm", title: "Every Kind of Major Event", text: "Hurricanes, tornadoes, thunderstorms, snow and ice storms, wildfires and other large outages — rapid, unplanned deployment at incident scale." },
    { icon: "wifi-off", title: "Offline-First by Design", text: "Field crews keep working when servers or cell towers don't. Everything syncs when connectivity returns." },
    { icon: "users", title: "Multi-Organization from Day One", text: "Your utility and unlimited contractors in one platform, each with their own secure view." },
];

const crewFunctions = ["Overhead", "Underground", "Cable Splice", "Digger", "Mechanic", "Tree", "Damage Assessor", "Substation", "Transmission", "Service"];

const faqs = [
    { q: "Will our contractors actually adopt a new platform?", a: "That's why contractors with up to 10 crews use HEXaid for free, so there's almost no friction to join. When a utility encourages participation for deployment consideration, contractors move quickly — and being on HEXaid means being invited to more deployments from other utilities too." },
    { q: "What happens if HEXaid goes down during an active storm?", a: "The mobile apps are fully offline-capable. Field crews keep working if server connectivity is lost, and status updates, completions and photos queue locally and sync on reconnect. The architecture is designed to degrade gracefully, so an issue in one service doesn't stop the others." },
    { q: "Which outage management systems do you integrate with?", a: "HEXaid has a production-ready, bidirectional OMS integration today: work orders come in and completion data goes back. Other OMS and ADMS platforms, including GE ADMS, are on the roadmap. Even without OMS sync, HEXaid solves roster management, crew coordination, field visibility and billing from day one." },
    { q: "Our crews are unionized. How does GPS tracking work?", a: "Location tracking is session-based and operationally scoped — it is not 24/7 background monitoring. It captures location for travel ETAs and arrival confirmation at work sites. We provide technical documentation on exactly what is captured, when, and who can see it, to support your labor relations review." },
    { q: "How is our data secured in the cloud?", a: "HEXaid uses JWT-based authentication with short-lived, automatically rotated tokens. Each organization's data is isolated at the application layer, so contractors can't see each other's data and your internal operations stay private. All data is transmitted over TLS, and we're happy to walk your security team through the architecture." },
    { q: "We only have one or two major events a year. Is it worth it?", a: "HEXaid also helps with the work before storm season: pre-qualifying contractors, managing documentation and keeping contact lists current. During an event, cutting the roster approval cycle from hours to minutes across dozens of contractors adds up fast — and contractors on the platform are ready for your next event with no onboarding delay." },
    { q: "Does HEXaid work with our Mutual Aid Agreements?", a: "Yes. Your MAA is the legal framework; HEXaid is the operational execution layer within it. When you declare a mutual aid event, HEXaid coordinates the deployment, tracks the work and documents everything — giving you the audit trail and invoice data you need for post-storm reimbursement claims." },
    { q: "What happens to our data if we stop using HEXaid?", a: "You own your data. Incident history, crew records, deployments, audit logs and documents can be exported in standard formats, and data return and deletion terms are written into your contract." },
    { q: "Does HEXaid use AI?", a: "AI features are on our roadmap to make review and approval even faster. But the core problems — roster chaos, double-booking, no field visibility, manual OMS updates — don't need AI to solve. HEXaid solves them today with structured workflows and real-time data." },
];

const FeatureList = ({ items }: { items: typeof utilityFeatures }) => (
    <div className="feat-list">
        {items.map((f) => (
            <div className="feat" key={f.title}>
                <div className={`icon ${f.tone}`}><Icon name={f.icon} /></div>
                <div>
                    <h4>{f.title}</h4>
                    <p>{f.text}</p>
                </div>
            </div>
        ))}
    </div>
);

const IconCard = ({ icon, tone, title, text }: { icon: IconName; tone: string; title: string; text: string }) => (
    <div className="card fcard" data-aos="fade-up">
        <div className={`icon ${tone}`}><Icon name={icon} /></div>
        <h3>{title}</h3>
        <p>{text}</p>
    </div>
);

function HexAid() {
    const [playing, setPlaying] = useState(false);
    const [openQs, setOpenQs] = useState<Set<number>>(new Set());

    const toggleQ = (i: number) =>
        setOpenQs((prev) => {
            const next = new Set(prev);
            if (next.has(i)) next.delete(i);
            else next.add(i);
            return next;
        });

    return (
        <div className={`hx ${inter.className}`}>
            <Head>
                <title>HEXaid | Emergency Response Operations for Electric Utilities</title>
                <meta
                    name="description"
                    content="HEXaid is the emergency response operations platform built for electric utilities and their mutual aid contractor networks — from the first deployment request to the last invoice."
                />
            </Head>
            <Sprite />

            {/* HERO */}
            <section className="hero">
                <div className="wrap hero-grid">
                    <div>
                        <span className="pill">Built for electric utility mutual aid</span>
                        <h1>
                            Emergency response,
                            <br />
                            <span>coordinated in minutes.</span>
                        </h1>
                        <p className="lead">
                            HEXaid is the cloud-based mutual aid and restoration operations platform for electric utilities. Resources come from many organizations; your team gets one current view of the whole response — from the first request to the last invoice.
                        </p>
                        <div className="hero-ctas">
                            <DemoLink>
                                Request a Demo <Icon name="arrow" />
                            </DemoLink>
                        </div>
                        <div className="chips">
                            <span><i className="dot" />Cloud-hosted — nothing to install</span>
                            <span><i className="dot b" />Offline-ready iOS &amp; Android</span>
                            <span><i className="dot w" />Bidirectional OMS Sync</span>
                        </div>
                    </div>

                    <div className={`hero-video${playing ? " playing" : ""}`}>
                        <iframe
                            src={playing ? VIDEO_PLAY : VIDEO_BG}
                            title="HEXaid overview video"
                            allow="autoplay; fullscreen; picture-in-picture"
                            allowFullScreen
                        />
                        {!playing && (
                            <button className="play-btn" type="button" aria-label="Play HEXaid video with sound" onClick={() => setPlaying(true)}>
                                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                            </button>
                        )}
                    </div>
                </div>
            </section>

            <div className="strip">
                <div className="wrap">
                    <Icon name="storm" /> Storm season is coming. Run your next response on HEXaid instead of spreadsheets — deployed in weeks, not years.{" "}
                    <DemoLink className="">Book a demo</DemoLink>
                </div>
            </div>

            {/* PROBLEM */}
            <section className="problem">
                <div className="wrap">
                    <div className="split">
                        <div>
                            <span className="eyebrow">The status quo</span>
                            <h2>&ldquo;Works fine&rdquo; is costing you restoration hours</h2>
                            <p className="lead">
                                Most utilities managing 100+ contractors during a major event still coordinate the same way they did decades ago. You get through it — but nobody knows how many hours were lost to coordination friction.
                            </p>
                            <div className="pain-list">
                                {painPoints.map((p) => (
                                    <div key={p}><Icon name="x" />{p}</div>
                                ))}
                            </div>
                        </div>
                        <div className="card table" data-aos="fade-up">
                            <div className="table-head"><div>Status quo</div><div>With HEXaid</div></div>
                            {comparison.map(([before, after]) => (
                                <div className="table-row" key={before}>
                                    <div><Icon name="x" />{before}</div>
                                    <div><Icon name="check" />{after}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="quote-band" data-aos="fade-up">
                        <div className="big">⏱</div>
                        <div>
                            <p>Every hour before crews reach the field is an hour your customers are in the dark. HEXaid compresses roster submission-to-approval from hours to minutes.</p>
                            <small>What is an hour of restoration time worth?</small>
                        </div>
                    </div>
                </div>
            </section>

            {/* WHO */}
            <section>
                <div className="wrap center">
                    <span className="eyebrow">Who uses HEXaid</span>
                    <h2>Everyone in the response, working from one picture</h2>
                    <div className="grid-3">
                        {audiences.map((a) => <IconCard key={a.title} {...a} />)}
                    </div>
                </div>
            </section>

            {/* UTILITIES */}
            <section id="utilities" style={{ paddingTop: 0 }}>
                <div className="wrap aud">
                    <div>
                        <span className="eyebrow">For electric utilities</span>
                        <h2>Give your T&amp;D operations team their own command of the response</h2>
                        <p className="lead">Coordinate every contractor, crew and work order in one place — with the audit trail you need for post-storm reimbursement.</p>
                        <FeatureList items={utilityFeatures} />
                        <DemoLink>Request a Demo</DemoLink>
                    </div>
                    <div className="aud-visual" data-aos="fade-up" aria-hidden="true">
                        <div className="card panel">
                            <div className="panel-h"><b>Roster review</b><small>Incident: Ice Storm — North</small></div>
                            {rosterRows.map((r) => (
                                <div className="roster-row" key={r.name}>
                                    <div><b>{r.name}</b><div className="meta">{r.crews}</div></div>
                                    <div className="meta">{r.note}</div>
                                    <span className={`tag ${r.tag}`}>{r.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CONTRACTORS */}
            <section id="contractors" style={{ paddingTop: 0 }}>
                <div className="wrap aud rev">
                    <div className="aud-visual" data-aos="fade-up" aria-hidden="true">
                        <div className="phone">
                            <div className="phone-screen">
                                <div className="ph-top">
                                    <small>Field supervisor</small>
                                    <b>Crew OH-07 · 4 members</b>
                                    <span className="offline"><Icon name="wifi-off" />Offline — 3 updates queued</span>
                                </div>
                                <div className="ph-body">
                                    <div className="wp"><b>Work package #4471</b><div className="meta">Replace pole &amp; transformer</div><div className="bar"><i style={{ width: "70%" }} /></div></div>
                                    <div className="wp"><b>Work package #4472</b><div className="meta">Re-energize lateral</div><div className="bar"><i style={{ width: "20%" }} /></div></div>
                                    <div className="wp"><b>Safety briefing</b><div className="meta">Acknowledged by all 4 members</div></div>
                                    <div className="ph-btn">Mark complete</div>
                                    <div className="queue">Syncs automatically when signal returns</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <span className="eyebrow">For contractors</span>
                        <h2>Get invited to more deployments</h2>
                        <p className="lead">One platform for every utility you work with. Free for contractors with up to 10 crews.</p>
                        <FeatureList items={contractorFeatures} />
                    </div>
                </div>
            </section>

            {/* LIFECYCLE */}
            <section id="platform">
                <div className="wrap center">
                    <span className="eyebrow">One platform, the entire response</span>
                    <h2>From first request to last invoice</h2>
                    <p className="lead">HEXaid covers the full 13-stage mutual aid lifecycle, so utilities and contractors work from one system of record instead of spreadsheets, email threads and phone trees.</p>
                    <div className="steps">
                        {steps.map((s, i) => (
                            <div className="card step" data-aos="fade-up" key={s.title}>
                                <span className="num">{String(i + 1).padStart(2, "0")}</span>
                                <div className={`icon ${s.tone}`}><Icon name={s.icon} /></div>
                                <h3>{s.title}</h3>
                                <p>{s.text}</p>
                            </div>
                        ))}
                    </div>
                    <div className="stages" data-aos="fade-up">
                        <div className="stages-h">The 13-stage core workflow</div>
                        <ol className="stg-list">
                            {stages.map(([tone, label], i) => (
                                <li className={`stg ${tone}`} key={label}>
                                    <span className="sn">{i + 1}</span>
                                    {label}
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </section>

            {/* BEFORE / DURING / AFTER */}
            <section style={{ paddingTop: 0 }}>
                <div className="wrap center">
                    <span className="eyebrow">Value at every phase</span>
                    <h2>Before, during and after the event</h2>
                    <p className="lead">HEXaid isn&apos;t just for the worst day of the year. It&apos;s useful whenever planned or unplanned work exceeds your internal capacity.</p>
                    <div className="grid-3">
                        {phases.map((p) => <IconCard key={p.title} {...p} />)}
                    </div>
                </div>
            </section>

            {/* SOUND FAMILIAR */}
            <section id="familiar">
                <div className="wrap center">
                    <span className="eyebrow">Sound familiar?</span>
                    <h2>
                        If you answer yes to any of these,
                        <br />
                        HEXaid was built for you
                    </h2>
                    <p className="lead">Tap <b>Yes</b> on any that sound like your team to see how HEXaid handles it.</p>
                    <div className="qgrid">
                        {questions.map((item, i) => {
                            const open = openQs.has(i);
                            const id = `hx-qa${i + 1}`;
                            return (
                                <div className={`card qcard${open ? " open" : ""}`} key={id}>
                                    <button className="q" type="button" aria-expanded={open} aria-controls={id} onClick={() => toggleQ(i)}>
                                        <span className="qm">?</span>
                                        <span>{item.q}</span>
                                    </button>
                                    <div className="qfoot">
                                        <button className="yes-btn" type="button" aria-expanded={open} aria-controls={id} onClick={() => toggleQ(i)}>
                                            {open ? "✓ That's us" : "Yes, that's us"}
                                        </button>
                                        <span className="qhint">Tap to see how HEXaid handles it</span>
                                    </div>
                                    <div className="a" id={id}>
                                        <div className="a-in">
                                            <span className="yes"><Icon name="check" />We do that</span>
                                            <br />
                                            <b>{item.lead}</b>
                                            {item.rest}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="hero-ctas" style={{ justifyContent: "center", marginBottom: 0 }}>
                        <DemoLink>See how it works for your utility</DemoLink>
                    </div>
                </div>
            </section>

            {/* STORM BAND */}
            <section className="storm">
                <div className="wrap center">
                    <span className="eyebrow">Designed for the worst days</span>
                    <h2>Built for the chaos of a Cat 4 hurricane</h2>
                    <p className="lead">Hundreds of contractors, many you&apos;ve never worked with, mobilizing in hours into areas where cell coverage is gone. HEXaid was designed from the ground up for exactly that.</p>
                    <div className="grid-3">
                        {stormCards.map((c) => (
                            <div className="storm-card" data-aos="fade-up" key={c.title}>
                                <div className="icon"><Icon name={c.icon} /></div>
                                <h3>{c.title}</h3>
                                <p>{c.text}</p>
                            </div>
                        ))}
                    </div>
                    <div className="crews">
                        <small>10 crew functions supported</small>
                        <div className="crew-chips">
                            {crewFunctions.map((c) => <span key={c}>{c}</span>)}
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section id="faq">
                <div className="wrap">
                    <div className="center">
                        <span className="eyebrow">FAQ</span>
                        <h2>Frequently asked questions</h2>
                    </div>
                    <div className="faq">
                        {/* Two independent columns so opening one item doesn't stretch its neighbour */}
                        {[faqs.slice(0, Math.ceil(faqs.length / 2)), faqs.slice(Math.ceil(faqs.length / 2))].map((col, c) => (
                            <div className="faq-col" key={c}>
                                {col.map((f) => (
                                    <details key={f.q}>
                                        <summary>{f.q}</summary>
                                        <p>{f.a}</p>
                                    </details>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="cta" id="demo">
                <div className="wrap">
                    <div className="cta-box">
                        <h2>Make this storm season the last one on spreadsheets</h2>
                        <p>Work backward from your next event window. Onboarding takes weeks, and your contractors can join for free.</p>
                        <div className="hero-ctas">
                            <DemoLink>Request a Demo</DemoLink>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default HexAid;
