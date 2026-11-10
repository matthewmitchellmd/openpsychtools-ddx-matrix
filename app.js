const MODULES = [
  {
    id: 'psychosis',
    title: 'Psychosis',
    short: 'Psychosis',
    subtitle: 'Primary, mood, substance, delirium, medical',
    description: 'Use chronology, mood relationship, attention/arousal, exposure history, and neurologic or systemic findings to separate primary psychiatric from secondary causes.',
    diagnoses: [
      {id:'primary', name:'Primary psychotic disorder', type:'Psychiatric', question:'Is there a sustained psychotic syndrome with functional decline that is not better explained by mood episodes, substances, delirium, or another medical condition?'},
      {id:'bipolar', name:'Bipolar disorder with psychosis', type:'Mood', question:'Does psychosis occur in the context of a distinct manic syndrome, and does the longitudinal course support episodic mood illness?'},
      {id:'mdd', name:'Major depression with psychosis', type:'Mood', question:'Is psychosis tightly linked to a major depressive syndrome rather than occurring independently?'},
      {id:'substance', name:'Substance or medication-induced psychosis', type:'Secondary', question:'Is there a convincing temporal relationship to intoxication, withdrawal, medication exposure, or dose change?'},
      {id:'delirium', name:'Delirium', type:'Medical', question:'Is there acute, fluctuating disturbance of attention or arousal suggesting an acute medical process?'},
      {id:'medical', name:'Medical or neurologic cause', type:'Medical', question:'Are there atypical age, focal neurologic, seizure, infectious, autoimmune, endocrine, or other systemic clues?'},
    ],
    features: [
      {id:'mood_independent', label:'Psychosis clearly occurs outside prominent mood episodes', help:'A longitudinal discriminator, not a single-visit observation.', effects:{primary:['support','Supports a primary psychotic-spectrum explanation.'], bipolar:['against','Argues against psychosis confined to mania or depression.'], mdd:['against','Argues against psychosis confined to a depressive episode.']}, absent:{bipolar:['context','If psychosis is always mood-bound, a mood disorder remains more plausible.'], mdd:['context','If psychosis is always mood-bound, a mood disorder remains more plausible.']}},
      {id:'mania', label:'Clear manic syndrome accompanies the psychosis', help:'Distinct change from baseline with activation and reduced need for sleep is especially informative.', effects:{bipolar:['support','Strongly increases concern for bipolar illness.'], primary:['context','Mood symptoms can coexist with primary psychosis, so chronology still matters.'], substance:['context','Substances and medications can mimic a manic-psychotic presentation.'], medical:['context','Secondary mania remains possible in atypical presentations.']}, absent:{bipolar:['against','No clear manic syndrome during the psychosis weakens a bipolar-with-psychosis explanation for the current presentation.'], primary:['context','Absence of a manic syndrome is compatible with a primary nonaffective psychotic presentation.']}},
      {id:'depression', label:'Major depressive syndrome accompanies the psychosis', help:'Assess whether psychosis is limited to depressive episodes or has an independent course.', effects:{mdd:['support','Supports mood-congruent or mood-associated psychotic depression.'], primary:['context','Depression can coexist with primary psychotic disorders.'], bipolar:['context','Depression can occur in bipolar illness; prior mania or hypomania matters.']}, absent:{mdd:['against','No concurrent major depressive syndrome weakens psychotic depression as the explanation for the current psychosis.'], primary:['context','Absence of a major depressive syndrome is compatible with a primary nonaffective psychotic presentation.']}},
      {id:'fluctuating_attention', label:'Attention, awareness, or arousal fluctuates over hours to days', help:'Recent fluctuating confusion or reduced ability to sustain attention is a medical red flag.', urgent:'Fluctuating attention or arousal with psychosis can indicate delirium or another acute medical process. Prompt medical evaluation is warranted.', effects:{delirium:['support','A core clue for delirium.'], primary:['against','Not typical of an uncomplicated primary psychotic disorder.'], bipolar:['against','Not typical of uncomplicated mania.'], mdd:['against','Not typical of uncomplicated psychotic depression.'], medical:['support','Can accompany acute neurologic, metabolic, infectious, or toxic causes.']}, absent:{delirium:['against','Stable attention and arousal across the observed course make delirium less consistent with the presentation.'], primary:['context','Preserved attention and arousal are compatible with a primary psychotic disorder.'], medical:['context','Absence of fluctuation lowers concern for delirium but does not exclude other medical or neurologic causes.']}},
      {id:'exposure', label:'Onset closely follows substance use, withdrawal, or a medication change', help:'Include prescribed drugs, nonprescribed substances, alcohol withdrawal, stimulants, steroids, and other relevant exposures.', effects:{substance:['support','Temporal linkage directly supports a substance or medication contribution.'], primary:['against','A tight exposure relationship weakens a purely primary explanation.'], bipolar:['context','Substances can precipitate or unmask mood episodes, so persistence outside exposure matters.']}, absent:{substance:['against','No convincing temporal relationship to intoxication, withdrawal, or a medication change weakens an exposure-induced explanation.'], primary:['context','Lack of a clear exposure trigger is compatible with a primary psychotic disorder.']}},
      {id:'abrupt', label:'Abrupt onset over hours to days', help:'Sudden onset is less typical for many primary chronic psychotic disorders.', effects:{delirium:['support','Fits an acute confusional process when attention or arousal is also disturbed.'], substance:['support','Fits intoxication, withdrawal, or medication effects.'], medical:['support','Raises concern for acute neurologic or systemic causes.'], primary:['against','Less typical for a gradual primary psychotic illness, though brief psychotic presentations exist.']}, absent:{primary:['support','A gradual evolution over weeks to months is more consistent with many primary psychotic-spectrum presentations.'], delirium:['against','A prolonged gradual course without acute fluctuation is less consistent with delirium.'], substance:['against','A gradual persistent course without a discrete exposure relationship is less characteristic of an acute intoxication or withdrawal syndrome.'], medical:['context','A gradual course lowers concern for some acute secondary causes but does not exclude medical or neurologic etiologies.']}},
      {id:'negative_decline', label:'Negative symptoms or progressive functional decline predate frank psychosis', help:'Examples include social withdrawal, reduced motivation, or declining role function over time.', effects:{primary:['support','Supports a primary psychotic-spectrum course.'], delirium:['against','A long prodromal decline is not explained by an isolated delirium.'], substance:['context','Chronic substance use can also impair function.'], bipolar:['context','Functional decline can occur in severe mood illness, but the relationship to discrete mood episodes matters.'], mdd:['context','Depression can cause withdrawal and role decline, so the presence or absence of a depressive syndrome remains important.'], medical:['context','Some neurologic or medical illnesses can also produce progressive behavioral or functional change.']}},
      {id:'neuro', label:'Focal neurologic findings, new seizure, severe new headache, or rapid cognitive change', help:'These findings should not be attributed to a primary psychiatric disorder without appropriate evaluation.', urgent:'Neurologic abnormalities, new seizures, severe new headache, or rapid cognitive change with psychosis require urgent medical or neurologic assessment.', effects:{medical:['support','Strongly supports a medical or neurologic contributor.'], delirium:['context','Acute neurologic illness can present with delirium.'], primary:['against','Atypical for an uncomplicated primary psychiatric presentation.']}, absent:{medical:['context','No focal neurologic, seizure, severe headache, or rapid cognitive clue lowers concern for some secondary causes but does not rule them out.'], primary:['context','A normal neurologic history and examination are compatible with a primary psychiatric presentation.']}},
      {id:'late_onset', label:'First psychotic presentation occurs at an atypical later age', help:'Later first onset increases the importance of secondary-cause assessment.', effects:{medical:['support','Raises the priority of medical and neurologic causes.'], substance:['context','Medication and substance effects remain important.'], primary:['against','Makes a typical early-onset primary psychotic illness less characteristic.']}, absent:{primary:['context','An age within the more typical onset range is compatible with a primary psychotic disorder, but age alone is not diagnostic.'], medical:['context','Typical age of onset lowers the salience of age as a secondary-cause clue but does not exclude medical causes.']}},
      {id:'systemic', label:'Fever, autonomic instability, systemic illness, or marked metabolic disturbance', help:'Systemic findings shift the differential toward acute medical causes.', urgent:'Psychosis with fever, autonomic instability, or significant systemic illness may represent a medical emergency.', effects:{medical:['support','Supports infectious, inflammatory, endocrine, metabolic, or other systemic causes.'], delirium:['support','Systemic illness commonly precipitates delirium.'], primary:['against','Not explained by an uncomplicated primary psychotic disorder.']}, absent:{medical:['context','No systemic illness or physiologic instability lowers concern for some acute medical causes but does not exclude secondary psychosis.'], delirium:['context','Absence of systemic illness lowers concern for some precipitants of delirium, although medications and other causes remain possible.'], primary:['context','Medical stability is compatible with a primary psychiatric presentation.']}},
    ],
    refs:[
      ['American Psychiatric Association','Practice Guideline for the Treatment of Patients With Schizophrenia (2020)','https://psychiatryonline.org/doi/full/10.1176/appi.ajp.2020.177901'],
      ['NICE','Psychosis and schizophrenia in adults: prevention and management (CG178)','https://www.nice.org.uk/guidance/cg178/chapter/Recommendations'],
      ['NICE','Delirium: prevention, diagnosis and management (CG103)','https://www.nice.org.uk/guidance/cg103/chapter/Recommendations']
    ]
  },
  {
    id:'mania', title:'Mania / elevated mood', short:'Mania', subtitle:'Bipolar vs ADHD vs secondary causes',
    description:'The highest-yield discriminators are episodicity, change from baseline, decreased need for sleep, developmental course, exposure timing, and evidence of a secondary medical cause.',
    diagnoses:[
      {id:'bipolar',name:'Bipolar manic or hypomanic episode',type:'Mood',question:'Is this a distinct episode of mood and energy change with characteristic activation rather than a chronic trait?'},
      {id:'adhd',name:'ADHD',type:'Neurodevelopmental',question:'Were attentional and impulsive symptoms present developmentally and across settings, including outside mood episodes?'},
      {id:'substance',name:'Substance or medication-induced mood syndrome',type:'Secondary',question:'Did symptoms start with intoxication, withdrawal, medication initiation, or dose escalation?'},
      {id:'anxiety',name:'Anxiety or agitated distress',type:'Psychiatric',question:'Is the activation better explained by persistent worry, tension, fear, or agitation without a true elevated or expansive mood syndrome?'},
      {id:'personality',name:'Personality-related affective instability',type:'Psychiatric',question:'Are shifts brief, reactive to interpersonal events, and part of a longstanding pattern rather than sustained episodes?'},
      {id:'medical',name:'Secondary mania from medical or neurologic illness',type:'Medical',question:'Is onset atypical, late, abrupt, neurologically abnormal, or temporally linked to a new medical illness?'},
    ],
    features:[
      {id:'episode',label:'Distinct episode and clear change from usual baseline',help:'A sustained episodic shift is more informative than isolated symptoms such as distractibility or irritability.',effects:{bipolar:['support','Strongly supports a bipolar mood episode.'],adhd:['against','ADHD symptoms are generally trait-like and developmental rather than newly episodic.'],personality:['against','Brief reactive shifts are more typical than a sustained syndrome.']}},
      {id:'sleep',label:'Decreased need for sleep without proportional fatigue',help:'Differentiate reduced need for sleep from insomnia with exhaustion the next day.',effects:{bipolar:['support','A particularly useful discriminator for mania or hypomania.'],anxiety:['against','Anxiety often causes insomnia but not a true reduced need for sleep.'],adhd:['against','Not a defining feature of ADHD.']}},
      {id:'grandiosity',label:'Grandiosity, expansive mood, or unusually elevated self-appraisal',help:'Assess as a change from the person’s baseline and cultural context.',effects:{bipolar:['support','Supports a manic syndrome.'],adhd:['against','Not characteristic of ADHD.'],anxiety:['against','Not characteristic of uncomplicated anxiety.']}},
      {id:'goal_activity',label:'Marked increase in goal-directed activity or driven behavior',help:'Look for change in quantity, intensity, and consequences of activity.',effects:{bipolar:['support','Supports manic activation.'],adhd:['context','Hyperactivity may overlap, but developmental persistence matters.'],substance:['context','Stimulants and other substances can produce a similar presentation.']}},
      {id:'childhood',label:'Similar attentional or impulsive symptoms were present in childhood and across settings',help:'Developmental continuity is central when considering ADHD.',effects:{adhd:['support','Supports ADHD as a longstanding neurodevelopmental condition.'],bipolar:['against','Weakens the idea that all symptoms are explained by a new mood episode.']}},
      {id:'reactive',label:'Mood shifts are brief and strongly reactive to interpersonal events',help:'Minutes-to-hours reactivity is different from a sustained mood episode.',effects:{personality:['support','Supports a longstanding reactive affective pattern.'],bipolar:['against','Less characteristic of a sustained manic or hypomanic episode.']}},
      {id:'exposure',label:'Symptoms closely follow stimulant, corticosteroid, antidepressant, dopaminergic, or other relevant exposure',help:'The exact medication and timing matter.',effects:{substance:['support','Directly supports a medication or substance contribution.'],bipolar:['context','An exposure can precipitate or reveal bipolar illness, so longitudinal course still matters.']}},
      {id:'late_neuro',label:'First episode is later in life, abrupt, or accompanied by neurologic/cognitive findings',help:'These are clues to secondary mania.',urgent:'New manic symptoms with neurologic abnormalities, altered consciousness, or rapid cognitive change warrant prompt medical or neurologic evaluation.',effects:{medical:['support','Raises concern for neurologic, endocrine, infectious, metabolic, or other secondary causes.'],bipolar:['against','Atypical for a classic early-onset bipolar course.']}},
      {id:'worry',label:'Persistent worry, autonomic tension, or fear dominates the presentation',help:'Racing thoughts alone are not specific to bipolar disorder.',effects:{anxiety:['support','Supports anxiety-related activation or agitation.'],bipolar:['context','Anxiety can coexist with mania, so evaluate the full mood syndrome.']}},
      {id:'between_episodes',label:'Distractibility or impulsivity persists when mood is otherwise euthymic',help:'Residual symptoms between mood episodes may point to comorbidity rather than bipolar illness alone.',effects:{adhd:['support','Supports ADHD when the pattern is developmental and cross-situational.'],bipolar:['context','Does not exclude bipolar disorder, but suggests another contributor.']}},
    ],
    refs:[
      ['CANMAT/ISBD','Bipolar Disorder Guidelines: 2023 evidence update','https://pmc.ncbi.nlm.nih.gov/articles/PMC11058959/'],
      ['Clinical Practice Guidelines','Management of bipolar disorder: 2025 update','https://pmc.ncbi.nlm.nih.gov/articles/PMC12900052/'],
      ['World Psychiatry','ADHD in adults: evidence base, uncertainties and controversies','https://pmc.ncbi.nlm.nih.gov/articles/PMC12434367/']
    ]
  },
  {
    id:'inattention', title:'Inattention', short:'Inattention', subtitle:'ADHD vs mood, anxiety, sleep, medical',
    description:'Use developmental onset, persistence across settings, episodicity, mood relationship, sleep quality, exposure history, and change from prior cognitive baseline.',
    diagnoses:[
      {id:'adhd',name:'ADHD',type:'Neurodevelopmental',question:'Is the inattention longstanding, developmentally rooted, impairing across settings, and present outside other psychiatric episodes?'},
      {id:'depression',name:'Depressive disorder',type:'Mood',question:'Did concentration worsen with a depressive syndrome and improve when mood and energy improved?'},
      {id:'anxiety',name:'Anxiety-related inattention',type:'Psychiatric',question:'Is attention being captured by worry, threat monitoring, rumination, or physiologic arousal?'},
      {id:'bipolar',name:'Bipolar mood episode',type:'Mood',question:'Is distractibility part of an episodic activation syndrome with reduced need for sleep and increased energy?'},
      {id:'sleep',name:'Sleep disorder or sleep deprivation',type:'Sleep',question:'Is there insufficient sleep, circadian misalignment, snoring/apneas, or pathologic daytime sleepiness?'},
      {id:'substance',name:'Substance or medication effect',type:'Secondary',question:'Did attention change with a substance, withdrawal state, sedating medication, stimulant misuse, or other medication change?'},
      {id:'medical',name:'Neurocognitive or medical cause',type:'Medical',question:'Is there a new decline from prior baseline, neurologic findings, or broader cognitive change?'},
    ],
    features:[
      {id:'childhood',label:'Attention problems were present in childhood or adolescence',help:'Developmental history is one of the most useful discriminators for ADHD.',effects:{adhd:['support','Supports a neurodevelopmental course.'],depression:['against','Makes a purely episode-limited depressive explanation less complete.'],anxiety:['context','Anxiety may coexist, but may not explain the full lifespan pattern.']}},
      {id:'cross_setting',label:'Persistent impairment across multiple settings and outside mood or anxiety episodes',help:'Examples include school/work, home, organization, appointments, and daily tasks.',effects:{adhd:['support','Supports persistent ADHD symptoms.'],depression:['against','Less consistent with attention difficulty confined to depression.'],bipolar:['against','Less consistent with distractibility confined to mood episodes.']}},
      {id:'episodic_mood',label:'Inattention appears mainly during mood episodes',help:'Clarify whether it resolves or markedly improves between episodes.',effects:{depression:['support','Supports depression-related cognitive symptoms when tied to depressive episodes.'],bipolar:['support','Supports a bipolar contribution when tied to manic or mixed episodes.'],adhd:['against','Weakens ADHD as the sole explanation.']}},
      {id:'rumination',label:'Worry, rumination, intrusive thoughts, or threat monitoring captures attention',help:'Ask what the mind is doing when concentration fails.',effects:{anxiety:['support','Supports anxiety-driven attentional capture.'],depression:['context','Depressive rumination can produce a similar mechanism.'],adhd:['context','Can coexist with ADHD.']}},
      {id:'anhedonia',label:'Low mood, anhedonia, low energy, or psychomotor slowing accompanies the inattention',help:'Concentration problems can be part of a broader depressive syndrome.',effects:{depression:['support','Supports depressive cognitive symptoms.'],adhd:['context','ADHD can coexist with depression.']}},
      {id:'activation',label:'Reduced need for sleep, increased energy, or other manic activation accompanies distractibility',help:'Distractibility is nonspecific without the broader syndrome.',effects:{bipolar:['support','Supports bipolar mood-related distractibility.'],adhd:['against','Makes ADHD alone less likely to explain the acute change.']}},
      {id:'sleep_clues',label:'Loud snoring, witnessed apneas, irregular sleep, insufficient sleep, or prominent daytime sleepiness',help:'Sleep disorders and sleep deprivation can mimic or worsen inattention.',effects:{sleep:['support','Supports a sleep-related contributor.'],adhd:['context','Sleep disorders may coexist with ADHD and worsen symptoms.'],depression:['context','Sleep disturbance can also accompany depression.']}},
      {id:'exposure',label:'Attention changed after a substance, withdrawal state, or medication change',help:'Sedatives, anticholinergic burden, stimulants, cannabis, alcohol, and other exposures may matter.',effects:{substance:['support','Supports a pharmacologic or substance contribution.'],adhd:['against','A new exposure-linked change is not explained by longstanding ADHD alone.']}},
      {id:'progressive',label:'Progressive decline from prior cognitive baseline',help:'Especially important when accompanied by new memory, language, visuospatial, or functional problems.',urgent:'A rapid or progressive cognitive decline, especially with neurologic findings or altered consciousness, warrants medical assessment rather than attribution to ADHD alone.',effects:{medical:['support','Supports neurocognitive or medical evaluation.'],adhd:['against','ADHD is developmental rather than a progressive acquired decline.']}},
      {id:'neuro',label:'New focal neurologic findings, seizures, gait change, or altered consciousness',help:'These findings require a broader medical differential.',urgent:'New neurologic deficits, seizures, gait change, or altered consciousness with cognitive symptoms require prompt medical evaluation.',effects:{medical:['support','Strongly supports a medical or neurologic cause.'],adhd:['against','Not explained by ADHD.'],anxiety:['against','Not explained by uncomplicated anxiety.']}},
    ],
    refs:[
      ['World Psychiatry','ADHD in adults: evidence base, uncertainties and controversies','https://pmc.ncbi.nlm.nih.gov/articles/PMC12434367/'],
      ['Australian ADHD Professionals Association','Australian evidence-based clinical practice guideline for ADHD','https://pmc.ncbi.nlm.nih.gov/articles/PMC10363932/'],
      ['NHLBI','Sleep apnea symptoms','https://www.nhlbi.nih.gov/health/sleep-apnea/symptoms']
    ]
  },
  {
    id:'anxiety', title:'Anxiety / panic', short:'Anxiety / panic', subtitle:'Panic, GAD, trauma, social, substance, medical',
    description:'The most useful questions concern whether attacks are unexpected or cue-bound, what the person fears, whether worry is diffuse, and whether substances or medical conditions can explain the autonomic symptoms.',
    diagnoses:[
      {id:'panic',name:'Panic disorder',type:'Anxiety',question:'Are there recurrent unexpected attacks followed by persistent concern, avoidance, or behavior change?'},
      {id:'gad',name:'Generalized anxiety disorder',type:'Anxiety',question:'Is anxiety dominated by persistent, difficult-to-control worry across multiple life domains rather than discrete unexpected attacks?'},
      {id:'social',name:'Social anxiety disorder',type:'Anxiety',question:'Is fear specifically organized around scrutiny, embarrassment, or negative evaluation?'},
      {id:'ptsd',name:'Trauma-related disorder',type:'Trauma',question:'Are anxiety episodes linked to trauma reminders, re-experiencing, hypervigilance, or trauma-related avoidance?'},
      {id:'substance',name:'Substance or medication-induced anxiety',type:'Secondary',question:'Is there a temporal link to stimulants, caffeine, withdrawal, decongestants, steroids, or other relevant exposures?'},
      {id:'medical',name:'Medical cause of anxiety-like symptoms',type:'Medical',question:'Could cardiac, endocrine, respiratory, neurologic, metabolic, or other medical disease better explain the symptoms?'},
    ],
    features:[
      {id:'unexpected',label:'Discrete attacks occur unexpectedly rather than only in a specific feared situation',help:'Panic attacks can occur in many disorders; unexpected attacks are more informative for panic disorder.',effects:{panic:['support','Supports panic disorder when recurrent and followed by ongoing concern or behavior change.'],social:['against','Purely social-cue-bound attacks are more characteristic of social anxiety.'],ptsd:['against','Purely trauma-cue-bound attacks point more toward a trauma-related disorder.']}},
      {id:'anticipatory',label:'Persistent fear of future attacks or meaningful behavior change after attacks',help:'Examples include avoidance, safety behaviors, or repeated reassurance seeking related to attacks.',effects:{panic:['support','Supports panic disorder rather than isolated panic attacks.']}},
      {id:'diffuse_worry',label:'Persistent worry spans multiple domains and is difficult to control',help:'Clarify whether the worry is broad rather than centered on panic attacks, scrutiny, or trauma cues.',effects:{gad:['support','Supports generalized anxiety.'],panic:['against','Broad ongoing worry is not specific to panic disorder.']}},
      {id:'negative_eval',label:'Fear is centered on scrutiny, embarrassment, or negative evaluation',help:'The content of the fear often distinguishes anxiety disorders.',effects:{social:['support','Supports social anxiety disorder.'],gad:['context','Social concerns can occur within broader generalized worry.'],panic:['against','If attacks occur only with scrutiny, another anxiety disorder may better explain them.']}},
      {id:'trauma',label:'Symptoms are linked to trauma reminders, re-experiencing, or hypervigilance',help:'Assess temporal relationship to trauma and the broader post-traumatic symptom pattern.',effects:{ptsd:['support','Supports a trauma-related explanation.'],panic:['against','Cue-bound trauma reactions are not the same as unexpected panic attacks.']}},
      {id:'exposure',label:'Symptoms track stimulant, caffeine, withdrawal, decongestant, steroid, or other medication/substance exposure',help:'Include prescribed, over-the-counter, and nonprescribed exposures.',effects:{substance:['support','Supports a substance or medication contribution.'],panic:['against','A tight exposure relationship weakens a primary panic explanation.'],gad:['against','A new exposure-linked syndrome is not explained by GAD alone.']}},
      {id:'cardiopulm',label:'Syncope, exertional chest pain, sustained arrhythmia, hypoxia, or significant respiratory symptoms',help:'These symptoms should not be assumed to be anxiety.',urgent:'Syncope, exertional chest pain, significant hypoxia, sustained arrhythmia, or serious respiratory symptoms require appropriate urgent medical evaluation.',effects:{medical:['support','Raises concern for cardiac or pulmonary causes.'],panic:['against','Medical causes must be evaluated before attributing serious cardiopulmonary symptoms to panic.']}},
      {id:'endocrine',label:'New tremor, heat intolerance, weight change, or other endocrine/metabolic clues',help:'Thyroid and metabolic conditions can produce anxiety-like symptoms.',effects:{medical:['support','Supports evaluation for endocrine or metabolic contributors.'],panic:['context','Panic can coexist with medical disease.']}},
      {id:'cue_bound',label:'Episodes occur only in a predictable situation or around a specific cue',help:'Ask what the person believes is dangerous in that situation.',effects:{social:['context','Supports social anxiety if the cue is scrutiny or evaluation.'],ptsd:['context','Supports trauma-related anxiety if the cue is trauma-linked.'],panic:['against','Argues against recurrent unexpected panic attacks as the central phenomenon.']}},
      {id:'medical_normal',label:'A focused medical evaluation is reassuring and symptoms follow a stable psychiatric pattern',help:'Use only when the relevant medical assessment has actually occurred.',effects:{medical:['against','Reduces concern for an identified medical explanation, though it does not exclude every cause.'],panic:['context','Can support a psychiatric formulation when the clinical pattern fits.'],gad:['context','Can support a psychiatric formulation when the clinical pattern fits.']}},
    ],
    refs:[
      ['NICE','Generalised anxiety disorder and panic disorder in adults (CG113)','https://www.nice.org.uk/guidance/cg113/chapter/Recommendations'],
      ['American Psychiatric Association','Practice Guideline for the Treatment of Patients With Panic Disorder','https://psychiatryonline.org/pb/assets/raw/sitewide/practice_guidelines/guidelines/panicdisorder.pdf'],
      ['FOCUS, APA','Morbid Anxiety: Identification and Treatment','https://psychiatryonline.org/doi/10.1176/appi.focus.20160046']
    ]
  },
  {
    id:'cognitive', title:'Cognitive change', short:'Cognitive change', subtitle:'Delirium, neurocognitive, mood, meds, sleep, neurologic',
    description:'Time course is central. Acute fluctuation and inattention suggest delirium; progressive functional decline suggests neurocognitive disease; medications, depression, sleep disorders, and neurologic illness remain common contributors.',
    diagnoses:[
      {id:'delirium',name:'Delirium',type:'Acute medical',question:'Is there an acute or fluctuating change in attention, awareness, or arousal due to an underlying medical or toxic process?'},
      {id:'ncd',name:'Major or mild neurocognitive disorder',type:'Neurocognitive',question:'Is there progressive acquired decline in one or more cognitive domains with corroborated functional change?'},
      {id:'depression',name:'Depression-related cognitive symptoms',type:'Mood',question:'Did cognitive complaints arise with a depressive syndrome, and are effort, motivation, or psychomotor changes prominent?'},
      {id:'meds',name:'Medication or substance effect',type:'Secondary',question:'Did cognition worsen with sedating, anticholinergic, intoxicating, or withdrawal-related exposures?'},
      {id:'sleep',name:'Sleep disorder or sleep deprivation',type:'Sleep',question:'Is poor sleep, sleep apnea, circadian disruption, or daytime sleepiness plausibly impairing cognition?'},
      {id:'neuro',name:'Other neurologic or medical cause',type:'Medical',question:'Are there focal neurologic, seizure, gait, endocrine, infectious, metabolic, or other systemic clues?'},
    ],
    features:[
      {id:'acute',label:'Onset is acute over hours to days',help:'An acute change from baseline should be treated differently from a chronic progressive complaint.',urgent:'Acute cognitive change can represent delirium, intoxication, withdrawal, infection, metabolic illness, stroke, or another urgent medical process.',effects:{delirium:['support','Strongly supports delirium when accompanied by inattention or fluctuation.'],ncd:['against','Less typical for an isolated slowly progressive neurocognitive disorder.'],neuro:['support','Also raises concern for acute neurologic or systemic illness.']}},
      {id:'fluctuation',label:'Attention, awareness, or arousal fluctuates during the day',help:'Fluctuation over short intervals is highly informative.',urgent:'Fluctuating attention or arousal suggests delirium until an acute medical cause is assessed.',effects:{delirium:['support','A key delirium clue.'],ncd:['against','Less characteristic of uncomplicated stable dementia, though delirium can occur on top of dementia.'],depression:['against','Not typical of uncomplicated depression.']}},
      {id:'progressive',label:'Progressive decline over months or years',help:'Use collateral information and compare to prior function.',effects:{ncd:['support','Supports a neurocognitive disorder.'],delirium:['against','An isolated delirium does not explain a long progressive decline.'],depression:['context','Depression can coexist with neurocognitive disease.']}},
      {id:'function',label:'Loss of previously independent instrumental daily functions',help:'Examples include finances, medication management, navigation, work tasks, or complex household activities.',effects:{ncd:['support','Functional decline strengthens concern for a neurocognitive disorder.'],depression:['context','Severe depression can impair function, so the mechanism and course matter.']}},
      {id:'depressive',label:'Prominent depressive syndrome accompanies the cognitive complaints',help:'Assess mood, anhedonia, energy, psychomotor change, sleep, and effort.',effects:{depression:['support','Supports depression-related cognitive symptoms.'],ncd:['context','Depression and neurocognitive disorders commonly coexist.']}},
      {id:'med_change',label:'Cognitive change follows a sedating, anticholinergic, intoxicating, or withdrawal-related exposure',help:'Review prescription, OTC, supplement, alcohol, and nonprescribed substance history.',effects:{meds:['support','Supports a medication or substance contribution.'],delirium:['context','Drug effects can precipitate delirium, especially in vulnerable patients.']}},
      {id:'sleep_clues',label:'Loud snoring, witnessed apneas, insufficient sleep, or prominent daytime sleepiness',help:'Poor sleep can impair attention, memory, and executive function.',effects:{sleep:['support','Supports a sleep-related contributor.'],depression:['context','Sleep disturbance may also be part of depression.'],ncd:['context','Sleep disorders may coexist with neurocognitive disease.']}},
      {id:'neuro',label:'Focal neurologic deficit, new seizure, severe new headache, or major gait change',help:'These findings require a neurologic differential.',urgent:'New focal neurologic deficits, seizures, severe new headache, or major gait change with cognitive symptoms require prompt medical or neurologic evaluation.',effects:{neuro:['support','Strongly supports a neurologic cause.'],ncd:['context','Some neurodegenerative disorders have neurologic findings, but acute focal signs require separate evaluation.']}},
      {id:'sensory',label:'Significant hearing or vision impairment may be affecting testing or function',help:'Sensory impairment can mimic or magnify apparent cognitive deficits.',effects:{ncd:['context','Cognitive testing can be misleading if sensory limitations are not accommodated.'],delirium:['context','Sensory impairment is also a delirium risk factor in vulnerable patients.']}},
      {id:'collateral',label:'A reliable informant confirms objective decline from prior baseline',help:'Collateral history is especially useful when insight is limited or course is unclear.',effects:{ncd:['support','Supports an acquired decline rather than an isolated subjective complaint.'],depression:['context','Does not exclude depression, but objective decline broadens the differential.']}},
    ],
    refs:[
      ['NICE','Delirium: prevention, diagnosis and management (CG103)','https://www.nice.org.uk/guidance/cg103/chapter/Recommendations'],
      ['NICE','Dementia: assessment, management and support (NG97)','https://www.nice.org.uk/guidance/ng97/chapter/Recommendations'],
      ['NHLBI','Sleep apnea symptoms','https://www.nhlbi.nih.gov/health/sleep-apnea/symptoms']
    ]
  },
  {
    id:'insomnia', title:'Insomnia / reduced sleep', short:'Insomnia', subtitle:'Insomnia, bipolar, anxiety, circadian, OSA, substances',
    description:'Separate difficulty sleeping from reduced need for sleep, circadian misalignment, sleep-disordered breathing, trauma/anxiety hyperarousal, and substance or medication effects.',
    diagnoses:[
      {id:'insomnia',name:'Chronic insomnia disorder',type:'Sleep',question:'Is there persistent difficulty initiating or maintaining sleep despite adequate opportunity, with meaningful daytime impairment?'},
      {id:'bipolar',name:'Bipolar mood episode',type:'Mood',question:'Is the person sleeping less because they need less sleep and feel activated, rather than because they are tired but unable to sleep?'},
      {id:'anxiety',name:'Anxiety or trauma-related hyperarousal',type:'Psychiatric',question:'Are worry, rumination, hypervigilance, or trauma-related symptoms driving the sleep disturbance?'},
      {id:'circadian',name:'Circadian rhythm sleep-wake disorder',type:'Sleep',question:'Does sleep become easier and more restorative when the person can sleep on their preferred biological schedule?'},
      {id:'osa',name:'Obstructive sleep apnea or sleep-disordered breathing',type:'Sleep',question:'Are loud snoring, witnessed pauses, gasping, or daytime sleepiness present?'},
      {id:'substance',name:'Substance or medication effect',type:'Secondary',question:'Is sleep disruption linked to caffeine, stimulants, alcohol, withdrawal, activating medication, or another exposure?'},
      {id:'other_sleep',name:'Other sleep disorder',type:'Sleep',question:'Are restless legs, parasomnia, hypersomnolence, or another sleep disorder better explaining the complaint?'},
    ],
    features:[
      {id:'opportunity',label:'Difficulty sleeping persists despite adequate opportunity and environment for sleep',help:'Distinguishes insomnia from simply not allocating enough time for sleep.',effects:{insomnia:['support','Supports insomnia disorder when persistent and impairing.'],circadian:['context','Circadian misalignment can still create difficulty at the desired clock time.']}},
      {id:'day_impair',label:'Sleep difficulty causes daytime fatigue, distress, concentration problems, or functional impairment',help:'Daytime consequence is important when distinguishing a disorder from normal variation.',effects:{insomnia:['support','Supports clinically meaningful insomnia.'],osa:['context','OSA can produce similar daytime impairment.'],other_sleep:['context','Other sleep disorders can also impair daytime function.']}},
      {id:'reduced_need',label:'Markedly reduced sleep with preserved or increased energy and little subjective need for sleep',help:'This is different from being exhausted but unable to fall asleep.',urgent:'Reduced need for sleep with escalating activation, psychosis, severe impulsivity, or dangerous behavior may indicate an acute manic syndrome requiring prompt psychiatric assessment.',effects:{bipolar:['support','Strongly supports manic or hypomanic activation.'],insomnia:['against','Argues against ordinary insomnia as the sole explanation.'],anxiety:['against','Anxiety-related insomnia usually leaves the person tired.']}},
      {id:'worry',label:'Worry, rumination, hypervigilance, or trauma-related arousal dominates at bedtime',help:'Clarify whether the arousal is generalized worry, trauma-linked, or sleep-focused anxiety.',effects:{anxiety:['support','Supports anxiety or trauma-related hyperarousal.'],insomnia:['context','Conditioned sleep anxiety can also maintain chronic insomnia.']}},
      {id:'preferred_schedule',label:'Sleep is easier and more restorative when allowed to follow a later, earlier, or shifted schedule',help:'A mismatch between biological timing and required schedule suggests circadian involvement.',effects:{circadian:['support','Supports circadian misalignment.'],insomnia:['against','Weakens a global inability-to-sleep explanation if sleep is normal on the preferred schedule.']}},
      {id:'apnea',label:'Loud snoring, witnessed breathing pauses, or gasping/choking during sleep',help:'These are classic clues to sleep-disordered breathing.',urgent:'Witnessed apneas or significant nocturnal breathing difficulty warrant medical evaluation for sleep-disordered breathing.',effects:{osa:['support','Strongly supports evaluation for obstructive sleep apnea or other sleep-disordered breathing.'],insomnia:['context','Insomnia symptoms can coexist with OSA.']}},
      {id:'sleepy',label:'Prominent daytime sleepiness or unintended dozing',help:'Differentiate sleepiness from fatigue alone.',effects:{osa:['support','Supports sleep-disordered breathing when combined with snoring or apneas.'],other_sleep:['support','Can point to another sleep disorder or insufficient sleep.'],insomnia:['context','Insomnia may cause daytime fatigue, but marked sleepiness broadens the differential.']}},
      {id:'restless_legs',label:'Urge to move the legs at rest, worse in the evening, relieved by movement',help:'A classic symptom pattern for restless legs syndrome.',effects:{other_sleep:['support','Supports restless legs syndrome or a related sleep disorder.'],insomnia:['against','Suggests a specific sleep disorder rather than nonspecific insomnia alone.']}},
      {id:'exposure',label:'Sleep changed with caffeine, stimulant, alcohol, withdrawal, or medication timing',help:'Include prescribed and nonprescribed substances and timing relative to bedtime.',effects:{substance:['support','Supports a substance or medication contribution.'],insomnia:['context','Exposures can precipitate or perpetuate insomnia.']}},
      {id:'irregular',label:'Sleep schedule varies substantially across workdays, free days, shifts, or travel',help:'A sleep diary can clarify pattern and timing.',effects:{circadian:['support','Supports circadian or schedule-related sleep disruption.'],insomnia:['context','Irregular schedules can also perpetuate insomnia.']}},
    ],
    refs:[
      ['VA/DoD','Clinical Practice Guideline for Chronic Insomnia Disorder and OSA (2025)','https://www.healthquality.va.gov/guidelines/CD/insomnia/index.asp'],
      ['NHLBI','Insomnia: diagnosis and causes','https://www.nhlbi.nih.gov/health/insomnia/diagnosis'],
      ['NHLBI','Sleep apnea symptoms','https://www.nhlbi.nih.gov/health/sleep-apnea/symptoms'],
      ['NHLBI','Circadian rhythm disorders: diagnosis','https://www.nhlbi.nih.gov/health/circadian-rhythm-disorders/diagnosis']
    ]
  },
  {
    id:'depression', title:'Depression', short:'Depression', subtitle:'Unipolar, bipolar, grief, substances, medical',
    description:'Clarify syndrome severity and course, screen for past mood elevation, and look for contextual, substance-related, psychotic, and medical contributors before assuming unipolar depression.',
    diagnoses:[
      {id:'mdd',name:'Major depressive disorder',type:'Mood',question:'Is there a sustained depressive syndrome with meaningful impairment that is not better explained by bipolarity, substances, a medical condition, or a normative stress response?'},
      {id:'bipolar',name:'Bipolar depression',type:'Mood',question:'Is there any credible history of mania or hypomania, mixed activation, or other longitudinal evidence of bipolar illness?'},
      {id:'adjustment',name:'Adjustment or grief-related distress',type:'Contextual',question:'Are symptoms closely tied to an identifiable stressor or loss, and does the pattern fit a contextual response rather than a broader recurrent mood syndrome?'},
      {id:'substance',name:'Substance or medication-induced depression',type:'Secondary',question:'Did the syndrome emerge with intoxication, withdrawal, medication initiation, or a dose change?'},
      {id:'medical',name:'Depression due to medical or neurologic illness',type:'Medical',question:'Are there endocrine, neurologic, infectious, inflammatory, sleep, or other systemic clues that could account for the change?'},
      {id:'psychotic',name:'Depression with psychotic or catatonic features',type:'Severe mood',question:'Are delusions, hallucinations, marked psychomotor abnormalities, or catatonic signs occurring in the depressive episode?'},
    ],
    features:[
      {id:'syndrome',label:'Persistent depressed mood or loss of interest with broader depressive symptoms and impairment',help:'Assess duration, severity, function, sleep, appetite, energy, cognition, guilt or hopelessness, and psychomotor change.',effects:{mdd:['support','Supports a depressive syndrome when the overall pattern is sustained and impairing.'],bipolar:['context','The depressive syndrome itself does not distinguish unipolar from bipolar depression.'],adjustment:['context','Contextual distress can also be clinically significant; chronology and syndrome pattern matter.']}},
      {id:'past_elevation',label:'Past episode of elevated or expansive mood, decreased need for sleep, or marked episodic activation',help:'Ask about lifetime episodes, not only current symptoms.',effects:{bipolar:['support','Strongly raises concern that the current depression is part of bipolar illness.'],mdd:['against','A credible prior manic or hypomanic episode argues against unipolar major depressive disorder.']}},
      {id:'mixed',label:'Current depression includes prominent activation, decreased need for sleep, racing thoughts, or increased goal-directed behavior',help:'Mixed depressive presentations warrant careful bipolar assessment.',effects:{bipolar:['support','Raises suspicion for bipolar-spectrum or mixed mood illness.'],mdd:['context','Agitation can occur in unipolar depression, so the full activation pattern matters.'],substance:['context','Stimulants, steroids, and other exposures can also produce activation.']}},
      {id:'stressor',label:'Symptoms began after a clear stressor or bereavement and remain tightly linked to it',help:'Do not assume that a stressor excludes a major depressive episode; assess syndrome severity, duration, and function.',effects:{adjustment:['support','Supports a contextual formulation when the response is closely linked to the stressor.'],mdd:['context','Major depression can be precipitated by stress or bereavement.']}},
      {id:'exposure',label:'Onset tracks substance use, withdrawal, medication initiation, or dose change',help:'Include alcohol, sedatives, stimulants, corticosteroids, and other prescribed or nonprescribed agents.',effects:{substance:['support','A close temporal relationship supports a substance or medication contribution.'],mdd:['against','A clearly exposure-bound syndrome weakens a purely primary unipolar explanation.'],bipolar:['context','Exposures can also precipitate or unmask mood episodes.']}},
      {id:'medical_clues',label:'New neurologic, endocrine, inflammatory, infectious, sleep, or systemic clues accompany the depression',help:'Examples include focal neurologic change, major endocrine symptoms, severe sleep-disordered breathing, or new systemic illness.',effects:{medical:['support','Supports assessment for a medical or neurologic contributor.'],mdd:['context','Medical illness and major depression can coexist.']}},
      {id:'psychosis',label:'Delusions or hallucinations occur during the depressive syndrome',help:'Clarify whether psychosis is mood-bound or also occurs outside mood episodes.',urgent:'Depression with psychosis, severe functional deterioration, or inability to maintain safety warrants prompt psychiatric assessment.',effects:{psychotic:['support','Supports a severe depressive presentation with psychotic features when the longitudinal relationship fits.'],bipolar:['context','Psychotic depression can occur in bipolar illness as well as unipolar depression.']}},
      {id:'catatonia',label:'Marked psychomotor abnormality suggests catatonia',help:'Examples include mutism, stupor, posturing, negativism, echophenomena, or purposeless agitation.',urgent:'Possible catatonia requires prompt clinical assessment because medical complications and underlying neurologic or systemic causes may require urgent treatment.',effects:{psychotic:['support','Severe depressive episodes can be associated with catatonia.'],medical:['context','Catatonia also occurs with medical and neurologic disorders and should not automatically be attributed to depression.']}},
      {id:'suicide',label:'Current suicidal intent, plan, recent attempt, or inability to maintain safety',help:'Safety assessment takes priority over diagnostic refinement.',urgent:'Current suicidal intent, a recent attempt, or inability to maintain safety requires immediate risk assessment and an appropriate level of care.',effects:{mdd:['context','Suicidality can occur in major depression.'],bipolar:['context','Suicide risk is also important in bipolar depression.'],psychotic:['context','Severe or psychotic depression may carry substantial risk.']}},
    ],
    refs:[
      ['NICE','Depression in adults: treatment and management (NG222)','https://www.nice.org.uk/guidance/ng222/chapter/recommendations'],
      ['NICE','Bipolar disorder: assessment and management (CG185)','https://www.nice.org.uk/guidance/cg185/chapter/Recommendations'],
      ['CANMAT/ISBD','Guidelines for bipolar disorder: summary and 2023 evidence update','https://psychiatryonline.org/doi/10.1176/appi.focus.20230009']
    ]
  },
  {
    id:'irritability', title:'Irritability', short:'Irritability', subtitle:'Mood, anxiety/trauma, ADHD, personality, substances, medical',
    description:'Irritability is highly transdiagnostic. Episodicity, developmental course, trauma or interpersonal reactivity, activation, exposure timing, and altered attention help organize the differential.',
    diagnoses:[
      {id:'bipolar',name:'Bipolar mood episode',type:'Mood',question:'Is irritability part of a distinct episode with increased energy, activation, decreased need for sleep, or other manic features?'},
      {id:'depression_anxiety',name:'Depression, anxiety, or trauma-related irritability',type:'Mood / anxiety',question:'Does irritability track depressed mood, worry, hyperarousal, trauma reminders, or sleep disruption rather than a manic syndrome?'},
      {id:'adhd',name:'ADHD or neurodevelopmental dysregulation',type:'Neurodevelopmental',question:'Is impulsive frustration a longstanding developmental pattern across settings rather than a new episodic change?'},
      {id:'personality',name:'Personality-related or interpersonal affective instability',type:'Psychiatric',question:'Are shifts rapid, reactive to interpersonal triggers, and part of a longstanding pattern?'},
      {id:'substance',name:'Substance or medication effect',type:'Secondary',question:'Did irritability emerge with intoxication, withdrawal, stimulant use, steroids, or another exposure?'},
      {id:'medical',name:'Delirium, neurologic, or other medical cause',type:'Medical',question:'Is irritability a new behavioral change accompanied by confusion, cognitive fluctuation, neurologic findings, pain, or systemic illness?'},
    ],
    features:[
      {id:'episodic_activation',label:'Irritability occurs in a distinct episode with increased energy or activation',help:'A clear change from baseline is more discriminating than irritability alone.',effects:{bipolar:['support','Supports a bipolar mood episode when accompanied by a broader activation syndrome.'],adhd:['against','A newly episodic pattern is less characteristic of ADHD.'],personality:['against','Sustained episodic activation is less typical of brief interpersonal reactivity.']}},
      {id:'reduced_sleep',label:'Decreased need for sleep without expected fatigue',help:'Differentiate reduced sleep need from insomnia with exhaustion.',effects:{bipolar:['support','Supports mania or hypomania when part of a broader episodic change.'],depression_anxiety:['against','Anxiety-related insomnia usually does not produce a true reduced need for sleep.']}},
      {id:'developmental',label:'Impulsivity and frustration intolerance were present since childhood and across settings',help:'Use developmental history and collateral when available.',effects:{adhd:['support','Supports a neurodevelopmental pattern.'],bipolar:['against','A lifelong trait alone does not support a new bipolar episode.']}},
      {id:'depressive_worry',label:'Irritability rises with depressed mood, anhedonia, persistent worry, or trauma hyperarousal',help:'Irritability commonly accompanies mood and anxiety syndromes.',effects:{depression_anxiety:['support','Supports depression, anxiety, or trauma-related irritability.'],bipolar:['context','Irritability can also occur in bipolar illness; activation and episodicity remain key.']}},
      {id:'interpersonal',label:'Shifts are rapid and strongly triggered by rejection, conflict, or perceived abandonment',help:'Assess whether this is a longstanding interpersonal pattern rather than a sustained mood episode.',effects:{personality:['support','Supports an interpersonal affective-instability formulation.'],bipolar:['against','Brief trigger-bound shifts are less characteristic of a sustained manic episode.']}},
      {id:'exposure',label:'Irritability tracks intoxication, withdrawal, stimulant use, corticosteroids, or another medication change',help:'Review prescribed, OTC, and nonprescribed exposures.',effects:{substance:['support','Supports an exposure-related cause.'],bipolar:['context','Substances can precipitate or unmask mood episodes.'],depression_anxiety:['context','Withdrawal and medication effects can also mimic anxiety or depression.']}},
      {id:'fluctuating_attention',label:'New irritability accompanies fluctuating attention, awareness, or disorientation',help:'Acute cognitive fluctuation is not explained by uncomplicated psychiatric irritability.',urgent:'New behavioral change with fluctuating attention or awareness may indicate delirium or another acute medical process and warrants prompt medical evaluation.',effects:{medical:['support','Strongly supports delirium or an acute medical contributor.'],bipolar:['against','Not typical of uncomplicated mania.'],adhd:['against','Not explained by ADHD.']}},
      {id:'neuro_systemic',label:'New focal neurologic findings, severe headache, seizure, fever, or systemic illness',help:'New neurologic or systemic abnormalities should shift attention toward secondary causes.',urgent:'Irritability with new neurologic abnormalities, seizure, fever, or significant systemic illness requires appropriate urgent medical assessment.',effects:{medical:['support','Supports a neurologic or systemic contributor.'],personality:['against','Objective acute medical findings are not explained by personality style.']}},
      {id:'violence',label:'Escalating aggression, homicidal intent, or inability to maintain safety',help:'Risk management takes priority over diagnostic refinement.',urgent:'Escalating violence risk, homicidal intent, or inability to maintain safety requires immediate risk assessment and an appropriate level of care.',effects:{bipolar:['context','Severe mood episodes can involve behavioral dyscontrol.'],substance:['context','Intoxication or withdrawal can increase behavioral risk.'],medical:['context','Delirium and neurologic illness can also present with agitation.']}},
    ],
    refs:[
      ['NICE','Bipolar disorder: assessment and management (CG185)','https://www.nice.org.uk/guidance/cg185/chapter/Recommendations'],
      ['Stringaris','The status of irritability in psychiatry: a conceptual and quantitative review','https://pubmed.ncbi.nlm.nih.gov/27343883/'],
      ['CANMAT/ISBD','Guidelines for bipolar disorder','https://pmc.ncbi.nlm.nih.gov/articles/PMC5947163/']
    ]
  },
  {
    id:'hallucinations', title:'Hallucinations', short:'Hallucinations', subtitle:'Psychotic, mood, substances, delirium, neurologic, sleep/sensory',
    description:'Hallucinations occur across psychiatric, neurologic, toxic, sensory, and sleep-related conditions. Modality alone is not diagnostic; chronology, attention, insight, exposure history, sensory status, and neurologic context matter more.',
    diagnoses:[
      {id:'primary',name:'Primary psychotic disorder',type:'Psychiatric',question:'Are hallucinations part of a sustained psychotic syndrome with delusions, disorganization, negative symptoms, or functional decline?'},
      {id:'mood',name:'Mood disorder with psychotic features',type:'Mood',question:'Are hallucinations tightly linked to a manic or major depressive episode?'},
      {id:'substance',name:'Substance or medication-induced hallucinations',type:'Secondary',question:'Is there a convincing temporal relationship to intoxication, withdrawal, or medication exposure?'},
      {id:'delirium',name:'Delirium',type:'Acute medical',question:'Do hallucinations occur with acute fluctuation in attention, awareness, or arousal?'},
      {id:'neuro_sensory',name:'Neurologic or sensory cause',type:'Medical',question:'Are there visual or auditory sensory deficits, seizure phenomena, parkinsonism, cognitive decline, focal findings, or other neurologic clues?'},
      {id:'sleep_trauma',name:'Sleep-transition, trauma-related, or dissociative phenomena',type:'Contextual',question:'Are experiences confined to sleep-wake transitions, severe sleep loss, trauma-linked states, or dissociative episodes rather than a sustained psychotic syndrome?'},
    ],
    features:[
      {id:'other_psychosis',label:'Hallucinations occur with fixed delusions, disorganization, negative symptoms, or progressive functional decline',help:'The broader syndrome is more informative than the sensory modality alone.',effects:{primary:['support','Supports a primary psychotic-spectrum syndrome.'],mood:['context','Mood disorders can also have psychotic features, so mood chronology matters.'],neuro_sensory:['context','Neurologic illness can also cause psychosis-like syndromes.']}},
      {id:'mood_bound',label:'Hallucinations occur only during a clear manic or major depressive episode',help:'Longitudinal history is essential.',effects:{mood:['support','Supports mood-associated psychosis.'],primary:['against','Psychosis strictly confined to mood episodes weakens a primary nonaffective psychosis formulation.']}},
      {id:'exposure',label:'Onset closely follows intoxication, withdrawal, or a medication change',help:'Include alcohol withdrawal, stimulants, hallucinogens, dopaminergic agents, steroids, and other relevant exposures.',effects:{substance:['support','Supports an exposure-related cause.'],primary:['against','A tight exposure relationship weakens a purely primary explanation.']}},
      {id:'fluctuation',label:'Hallucinations occur with fluctuating attention, awareness, or arousal',help:'Visual phenomena are common in delirium, but modality alone is not sufficient.',urgent:'Hallucinations with acute fluctuating attention or arousal can indicate delirium or another acute medical process and warrant prompt medical evaluation.',effects:{delirium:['support','A key clue for delirium.'],primary:['against','Not typical of an uncomplicated primary psychotic disorder.'],neuro_sensory:['context','Neurologic illness can precipitate delirium.']}},
      {id:'visual_neuro',label:'New prominent visual hallucinations occur with cognitive decline, parkinsonism, seizure symptoms, or focal neurologic findings',help:'Neurologic context substantially changes the differential.',urgent:'New hallucinations with seizure, focal neurologic deficits, severe headache, rapidly progressive cognitive change, or altered consciousness require prompt medical or neurologic assessment.',effects:{neuro_sensory:['support','Supports a neurologic contributor.'],primary:['against','Atypical neurologic findings argue against uncomplicated primary psychosis.']}},
      {id:'sensory_loss',label:'Significant vision or hearing impairment is present',help:'Sensory deprivation can be associated with hallucinations and should be considered explicitly.',effects:{neuro_sensory:['support','Supports a sensory-deprivation or neurologic contribution.'],primary:['context','Sensory impairment does not exclude a psychiatric disorder.']}},
      {id:'sleep_transition',label:'Experiences occur only while falling asleep or waking, especially with sleep deprivation',help:'Clarify whether the phenomenon persists during fully alert daytime wakefulness.',effects:{sleep_trauma:['support','Supports sleep-transition or sleep-loss phenomena.'],primary:['against','Experiences confined to sleep-wake transitions are less characteristic of a sustained psychotic disorder.']}},
      {id:'trauma_dissociation',label:'Experiences are strongly linked to trauma reminders, dissociation, or extreme stress',help:'Trauma-associated perceptual experiences can occur without a primary psychotic disorder.',effects:{sleep_trauma:['support','Supports a trauma-related or dissociative context.'],primary:['context','Trauma and psychotic disorders can coexist, so the broader syndrome still matters.']}},
      {id:'command',label:'Hallucinations include commands to harm self or others, or the person feels unable to resist them',help:'Content and ability to maintain safety are clinically important regardless of etiology.',urgent:'Command hallucinations involving harm, especially with intent or impaired ability to resist, require immediate safety assessment and an appropriate level of care.',effects:{primary:['context','Can occur in psychotic disorders.'],mood:['context','Can occur in severe mood disorders with psychosis.'],substance:['context','Can occur in substance-related psychosis.']}},
    ],
    refs:[
      ['Waters et al.','Hallucinations across diagnostic classes: systematic review','https://pmc.ncbi.nlm.nih.gov/articles/PMC5216859/'],
      ['Montagnese et al.','A review of multimodal hallucinations','https://pmc.ncbi.nlm.nih.gov/articles/PMC7825001/'],
      ['NICE','Delirium: prevention, diagnosis and management (CG103)','https://www.nice.org.uk/guidance/cg103/chapter/Recommendations']
    ]
  },
  {
    id:'paranoia', title:'Paranoia / persecutory thinking', short:'Paranoia', subtitle:'Psychotic, delusional, mood, trauma, substances, medical',
    description:'Clarify whether suspiciousness is a fixed delusional belief, part of a broader psychotic or mood syndrome, trauma-related hypervigilance, exposure-related, or associated with delirium or neurologic illness.',
    diagnoses:[
      {id:'primary',name:'Schizophrenia-spectrum psychosis',type:'Psychiatric',question:'Is persecutory thinking part of a broader psychotic syndrome with hallucinations, disorganization, negative symptoms, or functional decline?'},
      {id:'delusional',name:'Delusional disorder or circumscribed persecutory delusion',type:'Psychiatric',question:'Is there a persistent fixed belief with relatively preserved organization and function outside the delusional system?'},
      {id:'mood',name:'Mood disorder with psychotic features',type:'Mood',question:'Is paranoia confined to a manic or major depressive episode?'},
      {id:'trauma',name:'Trauma-related hypervigilance or personality-related suspiciousness',type:'Contextual',question:'Is suspiciousness longstanding or cue-linked, with retained reality testing and strong interpersonal or trauma context?'},
      {id:'substance',name:'Substance or medication-induced paranoia',type:'Secondary',question:'Did symptoms emerge with stimulant use, cannabis or other substances, withdrawal, or medication exposure?'},
      {id:'medical',name:'Delirium, neurocognitive, or neurologic cause',type:'Medical',question:'Is paranoia new or fluctuating with cognitive change, late-life onset, neurologic findings, or systemic illness?'},
    ],
    features:[
      {id:'broader_psychosis',label:'Paranoia occurs with hallucinations, disorganization, negative symptoms, or marked functional decline',help:'A broad psychotic syndrome is more consistent with schizophrenia-spectrum illness than an isolated delusion.',effects:{primary:['support','Supports a broader primary psychotic syndrome.'],delusional:['against','Marked disorganization or negative symptoms are less characteristic of circumscribed delusional disorder.']}},
      {id:'circumscribed',label:'Belief is persistent and fixed, but thought organization and function are otherwise relatively preserved',help:'Assess the degree of impairment outside the belief system.',effects:{delusional:['support','Supports a more circumscribed delusional presentation.'],primary:['against','Relative preservation outside the delusion is less typical of a broad schizophrenia-spectrum syndrome.']}},
      {id:'mood_bound',label:'Paranoia occurs only during a clear manic or major depressive episode',help:'Establish whether psychosis ever persists when the mood syndrome is absent.',effects:{mood:['support','Supports mood-associated psychosis.'],primary:['against','Psychosis strictly confined to mood episodes weakens a primary nonaffective psychosis formulation.']}},
      {id:'trauma_cue',label:'Suspiciousness intensifies around trauma reminders or interpersonal threat, with some capacity to reconsider beliefs',help:'Hypervigilance and mistrust are not equivalent to a fixed delusion.',effects:{trauma:['support','Supports a trauma-related or personality-context formulation.'],delusional:['against','Meaningful flexibility and cue dependence are less typical of a fixed delusional belief.']}},
      {id:'exposure',label:'Onset tracks stimulant, cannabis, hallucinogen, withdrawal, steroid, or other medication/substance exposure',help:'Temporal relationship is central.',effects:{substance:['support','Supports an exposure-related cause.'],primary:['against','A tight exposure relationship weakens a purely primary explanation.']}},
      {id:'fluctuation',label:'Suspiciousness fluctuates with attention, awareness, or disorientation',help:'Acute fluctuation suggests delirium rather than a stable psychotic belief system.',urgent:'New paranoia with fluctuating attention, awareness, or disorientation may indicate delirium or another acute medical process and warrants prompt medical evaluation.',effects:{medical:['support','Supports delirium or another acute medical contributor.'],primary:['against','Not typical of uncomplicated primary psychosis.'],delusional:['against','Not typical of a stable circumscribed delusion.']}},
      {id:'late_neuro',label:'First-onset paranoia occurs later in life with cognitive decline, neurologic findings, or major medication burden',help:'Late first onset increases the importance of secondary causes.',effects:{medical:['support','Raises concern for neurocognitive, neurologic, medication, or systemic causes.'],primary:['against','Less characteristic of a typical early-onset schizophrenia-spectrum course.']}},
      {id:'danger',label:'Persecutory beliefs are driving weapon access, violent intent, barricading, or inability to maintain safety',help:'Risk management takes priority over determining the final etiology.',urgent:'Paranoia associated with violent intent, weapon use, severe self-neglect, or inability to maintain safety requires immediate risk assessment and an appropriate level of care.',effects:{primary:['context','Risk can arise in primary psychosis.'],substance:['context','Substance-related paranoia can also produce dangerous behavior.'],medical:['context','Delirium and neurologic illness can produce severe behavioral disturbance.']}},
    ],
    refs:[
      ['NICE','Psychosis and schizophrenia in adults (CG178)','https://www.nice.org.uk/guidance/cg178/chapter/Recommendations'],
      ['BMJ Best Practice','Evaluation of psychosis: differential diagnosis','https://bestpractice.bmj.com/topics/en-us/1066'],
      ['CAMH','Psychosis: diagnosis and differential diagnosis','https://www.camh.ca/en/professionals/treating-conditions-and-disorders/psychosis/psychosis---diagnosis']
    ]
  },
  {
    id:'catatonia', title:'Catatonia / marked motor-behavioral change', short:'Catatonia', subtitle:'Mood, psychotic, medical, drug-related, delirium, malignant states',
    description:'Catatonia is a syndrome, not a diagnosis of cause. When characteristic motor or behavioral signs are present, identify the syndrome while actively evaluating mood, psychotic, neurologic, medical, and medication-related causes and important mimics.',
    diagnoses:[
      {id:'mood',name:'Catatonia associated with a mood disorder',type:'Psychiatric',question:'Is catatonia occurring during a major depressive, manic, or mixed mood episode?'},
      {id:'psychotic',name:'Catatonia associated with a psychotic disorder',type:'Psychiatric',question:'Is there a clear schizophrenia-spectrum or other psychotic syndrome underlying the catatonic presentation?'},
      {id:'medical',name:'Medical or neurologic catatonia',type:'Medical',question:'Is there encephalitis, seizure disorder, structural brain disease, metabolic disturbance, infection, autoimmune disease, or another medical cause?'},
      {id:'drug',name:'Medication, toxin, or withdrawal-related catatonia',type:'Secondary',question:'Did symptoms follow dopamine-blocking drugs, sedative withdrawal, intoxication, or another relevant exposure?'},
      {id:'delirium',name:'Delirium or encephalopathy',type:'Mimic / overlap',question:'Is reduced responsiveness or abnormal behavior better explained by acute fluctuating attention and consciousness, or is delirium co-occurring with catatonia?'},
      {id:'malignant',name:'Malignant catatonia / neuroleptic malignant syndrome or related emergency',type:'Emergency',question:'Are fever, autonomic instability, severe rigidity, marked laboratory abnormalities, or recent dopamine-blocking exposure suggesting a life-threatening syndrome?'},
    ],
    features:[
      {id:'core_motor',label:'Multiple characteristic catatonic signs are present',help:'Examples include stupor, mutism, negativism, posturing, waxy flexibility, echolalia/echopraxia, stereotypy, or purposeless agitation.',effects:{mood:['context','Catatonia can accompany mood disorders.'],psychotic:['context','Catatonia can accompany psychotic disorders.'],medical:['context','Catatonia can accompany many medical and neurologic illnesses.'],drug:['context','Medication or withdrawal states can also cause catatonia.'],delirium:['against','A recognizable catatonic motor syndrome is not explained by delirium alone, though both can coexist.']}},
      {id:'mood_episode',label:'A clear manic, mixed, or major depressive episode is present',help:'Mood disorders are common psychiatric contexts for catatonia.',effects:{mood:['support','Supports mood-associated catatonia.'],psychotic:['against','Weakens a purely psychotic-disorder explanation if the syndrome is clearly mood-bound.']}},
      {id:'psychotic_history',label:'A sustained psychotic syndrome predates or accompanies the motor syndrome',help:'Do not assume catatonia implies schizophrenia; establish the broader longitudinal diagnosis.',effects:{psychotic:['support','Supports catatonia associated with a psychotic disorder.'],mood:['context','Psychotic mood episodes remain possible depending on chronology.']}},
      {id:'neuro_medical',label:'New seizure, focal neurologic finding, rapidly progressive cognitive change, autoimmune/infectious clue, or major metabolic abnormality',help:'Medical and neurologic causes are common enough to require active consideration, particularly in first episodes.',urgent:'Possible catatonia with new neurologic abnormalities, seizure, rapidly progressive cognitive change, infection, or significant metabolic disturbance requires urgent medical evaluation.',effects:{medical:['support','Strongly supports a medical or neurologic cause.'],psychotic:['against','Objective acute neurologic or systemic findings are not explained by uncomplicated primary psychosis.']}},
      {id:'drug_exposure',label:'Symptoms follow dopamine-blocking medication, sedative withdrawal, intoxication, or another relevant exposure',help:'Medication and withdrawal history is essential.',effects:{drug:['support','Supports a medication, toxin, or withdrawal contribution.'],malignant:['context','Recent dopamine blockade becomes especially important when fever, rigidity, or autonomic instability is present.']}},
      {id:'fluctuating_attention',label:'Attention and arousal fluctuate markedly over hours to days',help:'Delirium and catatonia can overlap; assess both rather than forcing a false either-or choice.',urgent:'Marked fluctuation in attention or arousal suggests delirium or encephalopathy and warrants prompt medical evaluation.',effects:{delirium:['support','Supports delirium or encephalopathy, potentially co-occurring with catatonia.'],mood:['against','Not typical of uncomplicated mood disorder alone.']}},
      {id:'fever_rigidity',label:'Fever, severe rigidity, autonomic instability, or rapidly worsening systemic state',help:'This pattern raises concern for malignant catatonia, neuroleptic malignant syndrome, infection, or another medical emergency.',urgent:'Fever, severe rigidity, autonomic instability, or rapid systemic deterioration with catatonic symptoms is a medical emergency requiring immediate evaluation.',effects:{malignant:['support','Strongly supports a malignant syndrome requiring urgent differentiation.'],medical:['support','Also raises concern for severe medical or neurologic illness.']}},
      {id:'poor_intake',label:'Marked immobility or refusal of food/fluids is causing dehydration, pressure injury, or other medical compromise',help:'Catatonia can become medically dangerous even when the underlying cause is psychiatric.',urgent:'Catatonia with dehydration, inability to maintain nutrition, immobility complications, or other medical compromise requires urgent treatment and monitoring.',effects:{mood:['context','Can occur in severe mood-associated catatonia.'],psychotic:['context','Can occur in psychotic-disorder-associated catatonia.'],medical:['context','Medical complications do not identify the cause but increase urgency.']}},
    ],
    refs:[
      ['British Association for Psychopharmacology','Evidence-based consensus guidelines for the management of catatonia','https://pmc.ncbi.nlm.nih.gov/articles/PMC10101189/'],
      ['Rogers et al.','The diagnosis and treatment of catatonia','https://pmc.ncbi.nlm.nih.gov/articles/PMC11046566/'],
      ['American Psychiatric Association','Resource Document on Catatonia','https://www.psychiatry.org/getattachment/bd1b5149-2c2e-472c-8fa9-1e5e79aeb4d5/Resource-Document-on-Catatonia.pdf']
    ]
  },
  {
    id:'somatic', title:'Somatic symptoms / health concern', short:'Somatic symptoms', subtitle:'Medical, SSD, illness anxiety, panic, depression, functional neurologic',
    description:'Do not equate unexplained symptoms with a psychiatric diagnosis. First characterize the medical problem, then assess disproportionate health-related thoughts and behaviors, panic, depression, illness anxiety, and functional neurologic features.',
    diagnoses:[
      {id:'medical',name:'Medical condition',type:'Medical',question:'Is there objective clinical evidence or a coherent physiologic pattern suggesting an underlying medical disease?'},
      {id:'ssd',name:'Somatic symptom disorder',type:'Psychiatric',question:'Are distressing physical symptoms accompanied by persistent disproportionate thoughts, anxiety, or behaviors related to the symptoms, regardless of whether a medical condition is also present?'},
      {id:'illness',name:'Illness anxiety disorder',type:'Psychiatric',question:'Is the central problem persistent fear of serious illness despite absent or relatively mild somatic symptoms?'},
      {id:'panic',name:'Panic or anxiety disorder',type:'Anxiety',question:'Are bodily symptoms episodic or linked to anxiety surges, hyperventilation, persistent worry, or fear of recurrence?'},
      {id:'depression',name:'Depression with prominent somatic symptoms',type:'Mood',question:'Do fatigue, pain, sleep, appetite, or other bodily complaints occur within a broader depressive syndrome?'},
      {id:'fnd',name:'Functional neurologic symptom disorder',type:'Functional neurologic',question:'Are there neurologic-type symptoms with positive examination features showing internal inconsistency or incompatibility with recognized neurologic disease?'},
    ],
    features:[
      {id:'objective',label:'Objective examination, laboratory, imaging, or physiologic findings plausibly explain the symptoms',help:'A psychiatric formulation should not override evidence of medical disease.',effects:{medical:['support','Supports a medical explanation.'],ssd:['context','Somatic symptom disorder can coexist with genuine medical illness; the diagnosis concerns the response to symptoms, not whether symptoms are medically explained.'],illness:['against','Prominent objective disease makes illness anxiety disorder a less complete explanation.']}},
      {id:'disproportionate',label:'Persistent excessive health-related anxiety, preoccupation, checking, reassurance seeking, or health-care use is disproportionate to the clinical situation',help:'Focus on thoughts, feelings, and behaviors rather than labeling symptoms as medically unexplained.',effects:{ssd:['support','Supports a somatic symptom disorder formulation when significant somatic symptoms are present.'],illness:['context','Health anxiety can also be central to illness anxiety disorder.']}},
      {id:'minimal_symptoms',label:'Fear of serious illness is prominent despite absent or relatively mild bodily symptoms',help:'The distinction is the centrality of illness fear versus distress from substantial somatic symptoms.',effects:{illness:['support','Supports illness anxiety disorder.'],ssd:['against','Less characteristic of somatic symptom disorder when somatic symptoms themselves are minimal.']}},
      {id:'panic_pattern',label:'Symptoms occur in abrupt surges with fear, autonomic arousal, and concern about recurrence',help:'Cardiopulmonary or neurologic red flags still require appropriate medical assessment.',effects:{panic:['support','Supports a panic-spectrum explanation when the episode pattern fits.'],ssd:['context','Panic disorder can coexist with persistent somatic preoccupation.']}},
      {id:'depressive',label:'A sustained depressive syndrome accompanies fatigue, pain, sleep, appetite, or gastrointestinal complaints',help:'Somatic symptoms are common in depression.',effects:{depression:['support','Supports depression with prominent somatic symptoms.'],ssd:['context','Depression and somatic symptom disorder can coexist.']}},
      {id:'positive_fnd',label:'Neurologic-type symptoms have positive signs of internal inconsistency or incongruence on examination',help:'Functional neurologic disorder is diagnosed using positive clinical features, not simply normal tests.',effects:{fnd:['support','Supports a functional neurologic formulation when positive signs are present.'],medical:['context','Functional and structural neurologic disease can coexist.']}},
      {id:'new_red_flag',label:'New objective red flags are present for the symptom domain',help:'Examples include focal neurologic deficit, syncope, major bleeding, persistent fever, severe hypoxia, or other concerning objective abnormalities.',urgent:'New objective medical red flags should be evaluated according to the symptom domain rather than attributed to anxiety or somatic symptom disorder.',effects:{medical:['support','Raises concern for an underlying medical condition.'],ssd:['against','Do not use a somatic symptom formulation to explain away new objective red flags.'],panic:['against','Serious medical causes must be assessed when red flags are present.']}},
      {id:'stable_workup',label:'Appropriate focused medical evaluation is reassuring and the symptom pattern is stable over time',help:'Use this only when the relevant evaluation has actually occurred; normal testing does not itself establish a psychiatric diagnosis.',effects:{medical:['against','Reduces concern for an identified medical explanation but does not exclude every disease.'],ssd:['context','Can support a biopsychosocial formulation when disproportionate symptom-related thoughts and behaviors are also present.'],panic:['context','Can support an anxiety formulation when the clinical pattern fits.']}},
    ],
    refs:[
      ['Association of Medicine and Psychiatry','Somatic symptom disorder review and differential diagnosis','https://www.ncbi.nlm.nih.gov/books/NBK532253/'],
      ['Henningsen','Management of somatic symptom disorder','https://pmc.ncbi.nlm.nih.gov/articles/PMC6016049/'],
      ['Academy of Consultation-Liaison Psychiatry','How-To Guide: Somatic Symptom Disorder','https://clpsychiatry.org/wp-content/uploads/ACLP-How-To-Guide-Somatic-Symptom-Disorder.pdf']
    ]
  },
  {
    id:'eating', title:'Eating disturbance', short:'Eating disturbance', subtitle:'Restriction, bingeing, purging, ARFID, medical mimics',
    description:'Characterize restriction, binge eating, compensatory behaviors, body-image concerns, avoidance motives, weight trajectory, and medical stability. Weight alone does not determine eating-disorder severity or medical risk.',
    diagnoses:[
      {id:'anorexia',name:'Anorexia nervosa or restrictive eating disorder with weight/shape psychopathology',type:'Eating disorder',question:'Is restriction driven by fear of weight gain or persistent behavior interfering with weight restoration, with overvaluation or disturbance in body weight/shape experience?'},
      {id:'bulimia',name:'Bulimia nervosa',type:'Eating disorder',question:'Are recurrent binge episodes followed by recurrent compensatory behaviors such as vomiting, laxative misuse, fasting, or excessive exercise?'},
      {id:'bed',name:'Binge-eating disorder',type:'Eating disorder',question:'Are there recurrent loss-of-control binge episodes with distress but without regular compensatory behaviors?'},
      {id:'arfid',name:'Avoidant/restrictive food intake disorder',type:'Eating disorder',question:'Is restriction driven by sensory sensitivity, low interest in food, or fear of aversive consequences rather than weight or shape concerns?'},
      {id:'mood_anxiety',name:'Mood, anxiety, OCD, or trauma-related eating change',type:'Psychiatric',question:'Is appetite or eating disturbance secondary to depression, anxiety, obsessive fears, trauma, or another psychiatric syndrome without a primary eating-disorder pattern?'},
      {id:'medical',name:'Medical or gastrointestinal cause',type:'Medical',question:'Are endocrine, gastrointestinal, inflammatory, neurologic, medication-related, or other medical factors driving appetite loss, vomiting, weight change, or food avoidance?'},
    ],
    features:[
      {id:'shape_restriction',label:'Restriction is driven by fear of weight gain or strong weight/shape overvaluation',help:'Assess behavior and cognition rather than relying on body size alone.',effects:{anorexia:['support','Supports a restrictive eating disorder centered on weight or shape psychopathology.'],arfid:['against','Weight/shape motivation argues against ARFID as the primary explanation.'],mood_anxiety:['context','Mood and anxiety disorders can coexist with eating-disorder psychopathology.']}},
      {id:'binge',label:'Recurrent episodes involve loss of control while eating an unusually large amount',help:'Clarify frequency, context, associated distress, and whether compensatory behavior follows.',effects:{bulimia:['context','Binge episodes are central when recurrent compensatory behaviors are also present.'],bed:['support','Supports binge-eating disorder when regular compensatory behaviors are absent.']}},
      {id:'compensatory',label:'Recurrent vomiting, laxative/diuretic misuse, fasting, or driven exercise follows eating episodes or weight concerns',help:'Compensatory behaviors can produce significant medical risk at any body weight.',effects:{bulimia:['support','Supports bulimia nervosa when recurrent binge eating is also present.'],bed:['against','Regular compensatory behavior argues against binge-eating disorder.'],anorexia:['context','Purging behaviors may also occur in anorexia nervosa.']}},
      {id:'sensory_fear',label:'Restriction is driven by sensory characteristics, low appetite/interest, or fear of choking, vomiting, or other aversive consequences',help:'Confirm that weight or shape concerns are not the primary driver.',effects:{arfid:['support','Supports ARFID when nutritional or functional consequences are clinically significant.'],anorexia:['against','A non-weight/shape motive argues against classic anorexia nervosa as the primary mechanism.']}},
      {id:'mood_link',label:'Eating or appetite change closely tracks a depressive, anxiety, obsessive, or trauma-related syndrome',help:'Appetite loss or overeating can be secondary to other psychiatric conditions.',effects:{mood_anxiety:['support','Supports a secondary psychiatric contributor.'],anorexia:['context','Comorbidity is common, so the motive for eating behavior still matters.'],bed:['context','Mood symptoms can coexist with binge eating.']}},
      {id:'medical_clues',label:'GI symptoms, endocrine symptoms, inflammatory signs, medication effects, or other medical findings plausibly drive intake or weight change',help:'Medical illness can mimic or coexist with eating disorders.',effects:{medical:['support','Supports medical evaluation for an underlying cause.'],anorexia:['context','An eating disorder and medical illness can coexist.'],arfid:['context','ARFID can also coexist with GI disease, so avoid assuming one excludes the other.']}},
      {id:'instability',label:'Syncope, marked orthostasis, significant bradycardia, dehydration, electrolyte abnormality, prolonged QT, or other evidence of medical instability',help:'Medical instability can occur across eating disorders and is not excluded by a normal-range BMI.',urgent:'Eating disturbance with cardiovascular instability, dehydration, significant electrolyte abnormality, prolonged QT, syncope, or other medical compromise requires urgent medical assessment and may require a higher level of care.',effects:{anorexia:['context','Restriction can lead to medical instability.'],bulimia:['context','Purging can cause serious electrolyte and cardiac complications.'],arfid:['context','Severe restriction can cause medical instability.'],medical:['support','Objective instability requires medical assessment regardless of psychiatric diagnosis.']}},
      {id:'hematemesis',label:'Hematemesis, severe abdominal pain, altered consciousness, or other acute medical complication',help:'Acute complications should not wait for outpatient diagnostic clarification.',urgent:'Hematemesis, severe abdominal pain, altered consciousness, or another acute medical complication in the setting of eating disturbance requires emergency medical assessment.',effects:{bulimia:['context','Vomiting can cause acute GI complications.'],medical:['support','Acute symptoms require medical evaluation.']}},
      {id:'suicide',label:'Current suicidal intent, severe self-harm risk, or inability to maintain safety',help:'Eating disorders frequently coexist with other psychiatric risk factors; safety assessment remains essential.',urgent:'Current suicidal intent, severe self-harm risk, or inability to maintain safety requires immediate risk assessment and an appropriate level of care.',effects:{anorexia:['context','Suicide risk is clinically important in anorexia nervosa.'],bulimia:['context','Suicidal behavior can occur in bulimia nervosa.'],bed:['context','Comorbid mood illness and suicide risk should be assessed.']}},
    ],
    refs:[
      ['American Psychiatric Association','Practice Guideline for the Treatment of Patients With Eating Disorders','https://psychiatryonline.org/doi/10.1176/appi.ajp.23180001'],
      ['NICE','Eating disorders: recognition and treatment (NG69)','https://www.nice.org.uk/guidance/ng69/chapter/Recommendations'],
      ['Royal College / MEED summary','Assessment and management of medical emergencies in eating disorders','https://pmc.ncbi.nlm.nih.gov/articles/PMC10147425/']
    ]
  }

];

const EXAMPLE_CASE = {
  moduleId: 'psychosis',
  title: 'Fictional example: first-episode psychosis',
  vignette: 'A 24-year-old graduate student has had about 10 months of progressive social withdrawal, reduced motivation, worsening hygiene, and declining school performance. Over the last 4 months, family has noticed increasingly disorganized conversation, persistent voices commenting on the patient, and a fixed belief that classmates are monitoring the apartment. The course was gradual rather than abrupt. The patient remains alert and oriented with stable attention and no waxing and waning of awareness. There has been no clear manic syndrome, major depressive episode, or period in which the psychosis was confined to a mood episode. The patient used cannabis intermittently in the past but stopped more than 2 months ago; the psychosis continued without meaningful change and did not begin during intoxication, withdrawal, or after a medication change. There is no new seizure, focal neurologic deficit, severe headache, rapid cognitive decline, fever, autonomic instability, or other systemic illness. The hallucinations occur during fully awake daytime periods, are not limited to sleep transitions, are not predominantly visual, and are not linked to hearing or vision loss, trauma reminders, or dissociation. They are not commanding self-harm or violence. The persecutory thinking occurs as part of the broader hallucination, disorganization, and functional-decline syndrome rather than as a single circumscribed delusion, and there is no weapon access, violent intent, or barricading behavior.',
  moduleAnswers: {
    psychosis: {
      mood_independent: 'present',
      mania: 'absent',
      depression: 'absent',
      fluctuating_attention: 'absent',
      exposure: 'absent',
      abrupt: 'absent',
      negative_decline: 'present',
      neuro: 'absent',
      late_onset: 'absent',
      systemic: 'absent'
    },
    hallucinations: {
      other_psychosis: 'present',
      mood_bound: 'absent',
      exposure: 'absent',
      fluctuation: 'absent',
      visual_neuro: 'absent',
      sensory_loss: 'absent',
      sleep_transition: 'absent',
      trauma_dissociation: 'absent',
      command: 'absent'
    },
    paranoia: {
      broader_psychosis: 'present',
      circumscribed: 'absent',
      mood_bound: 'absent',
      trauma_cue: 'absent',
      exposure: 'absent',
      fluctuation: 'absent',
      late_neuro: 'absent',
      danger: 'absent'
    }
  }
};

const state = { moduleId: MODULES[0].id, answers: {}, exampleActive: false };
const $ = (id) => document.getElementById(id);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function currentModule(){ return MODULES.find(m => m.id === state.moduleId); }
function answerKey(moduleId, featureId){ return `${moduleId}:${featureId}`; }
function getAnswer(featureId){ return state.answers[answerKey(state.moduleId, featureId)] || 'unknown'; }
function setAnswer(featureId, value){
  state.answers[answerKey(state.moduleId, featureId)] = value;
  if(state.exampleActive) state.exampleActive = false;
  renderAll();
}

function loadExample(){
  state.answers = {};
  state.moduleId = EXAMPLE_CASE.moduleId;
  Object.entries(EXAMPLE_CASE.moduleAnswers).forEach(([moduleId,answers]) => {
    Object.entries(answers).forEach(([featureId,value]) => {
      state.answers[answerKey(moduleId, featureId)] = value;
    });
  });
  state.exampleActive = true;
  renderAll();
  document.querySelector('.matrix-header-panel')?.scrollIntoView({behavior:'smooth',block:'start'});
  toast('Fictional example loaded');
}

function renderExample(){
  const box = $('exampleCase');
  if(!state.exampleActive || !EXAMPLE_CASE.moduleAnswers[state.moduleId]){
    box.classList.add('hidden');
    box.innerHTML='';
    return;
  }
  box.classList.remove('hidden');
  const populated = Object.keys(EXAMPLE_CASE.moduleAnswers).map(id => MODULES.find(m => m.id===id)?.short).filter(Boolean).join(', ');
  box.innerHTML = `<strong>${esc(EXAMPLE_CASE.title)}</strong><p>${esc(EXAMPLE_CASE.vignette)}</p><span>Fictional demonstration only. This example pre-fills ${esc(populated)}. Click those matrices in the left panel to see the same case from different presenting-symptom views.</span>`;
}

function renderNav(){
  $('moduleNav').innerHTML = MODULES.map(m => `
    <button class="module-button ${m.id===state.moduleId?'active':''}" data-module="${m.id}">
      ${esc(m.short)}<small>${esc(m.subtitle)}</small>
    </button>`).join('');
  document.querySelectorAll('[data-module]').forEach(btn => btn.addEventListener('click', () => {
    state.moduleId = btn.dataset.module; renderAll(); window.scrollTo({top:0,behavior:'smooth'});
  }));
}

function renderHeader(){
  const m = currentModule();
  $('moduleEyebrow').textContent = 'Matrix';
  $('moduleTitle').textContent = m.title;
  $('moduleDescription').textContent = m.description;
}

function renderFeatures(){
  const m = currentModule();
  $('featureList').innerHTML = m.features.map(f => {
    const a = getAnswer(f.id);
    return `<div class="feature-row ${f.urgent && a==='present'?'flagged':''}">
      <div><div class="feature-title">${esc(f.label)}</div><div class="feature-help">${esc(f.help)}</div></div>
      <div class="segmented" role="group" aria-label="${esc(f.label)}">
        <button data-feature="${f.id}" data-value="present" class="${a==='present'?'active-present':''}">Present</button>
        <button data-feature="${f.id}" data-value="absent" class="${a==='absent'?'active-absent':''}">Absent</button>
        <button data-feature="${f.id}" data-value="unknown" class="${a==='unknown'?'active-unknown':''}">Unknown</button>
      </div>
    </div>`;
  }).join('');
  document.querySelectorAll('[data-feature][data-value]').forEach(btn => btn.addEventListener('click', () => setAnswer(btn.dataset.feature, btn.dataset.value)));
}

function effectFor(f, dxId){
  const a = getAnswer(f.id);
  if(a === 'present') return f.effects?.[dxId] || null;
  if(a === 'absent') return f.absent?.[dxId] || null;
  return null;
}

function renderMatrix(){
  const m = currentModule();
  $('matrixHead').innerHTML = `<tr><th>Finding</th>${m.diagnoses.map(d => `<th>${esc(d.name)}</th>`).join('')}</tr>`;
  $('matrixBody').innerHTML = m.features.map(f => {
    const a = getAnswer(f.id);
    const first = `<td><span class="matrix-feature-name">${esc(f.label)}</span><span class="state-pill ${a}">${a[0].toUpperCase()+a.slice(1)}</span></td>`;
    const cells = m.diagnoses.map(d => {
      const e = effectFor(f,d.id);
      if(!e) return '<td><span class="effect-text">No specific inference from this selection.</span></td>';
      return `<td><span class="effect-pill ${e[0]}">${e[0]==='support'?'Supports':e[0]==='against'?'Argues against':'Context dependent'}</span><span class="effect-text">${esc(e[1])}</span></td>`;
    }).join('');
    return `<tr>${first}${cells}</tr>`;
  }).join('');
}

function renderSafety(){
  const m = currentModule();
  const flags = m.features.filter(f => f.urgent && getAnswer(f.id)==='present').map(f => f.urgent);
  if(!flags.length){ $('safetyBox').classList.add('hidden'); $('safetyBox').innerHTML=''; return; }
  $('safetyBox').classList.remove('hidden');
  $('safetyBox').innerHTML = `<strong>Safety / medical red flag</strong><ul>${flags.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`;
}

function unresolvedForDx(m, dx){
  return m.features.filter(f => getAnswer(f.id)==='unknown' && (f.effects?.[dx.id] || f.absent?.[dx.id])).slice(0,4).map(f=>f.label);
}

function renderSynthesis(){
  const m = currentModule();
  $('diagnosisCards').innerHTML = m.diagnoses.map(dx => {
    const supports=[], against=[];
    m.features.forEach(f => {
      const e = effectFor(f,dx.id);
      if(!e) return;
      if(e[0]==='support') supports.push(f.label);
      if(e[0]==='against') against.push(f.label);
    });
    const unresolved = unresolvedForDx(m,dx);
    const list = arr => arr.length ? `<ul>${arr.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>` : '<div class="empty-mini">None from the findings marked so far.</div>';
    return `<article class="dx-card">
      <div class="dx-title"><h3>${esc(dx.name)}</h3><span class="dx-type">${esc(dx.type)}</span></div>
      <div class="key-question"><strong>Key question:</strong> ${esc(dx.question)}</div>
      <div class="dx-section"><strong>Supports</strong>${list(supports)}</div>
      <div class="dx-section"><strong>Argues against</strong>${list(against)}</div>
      <div class="dx-section"><strong>Still useful to clarify</strong>${list(unresolved)}</div>
    </article>`;
  }).join('');
}

function renderRefs(){
  const m = currentModule();
  $('references').innerHTML = m.refs.map(r => `<div class="reference-item"><strong>${esc(r[0])}.</strong> <a href="${esc(r[2])}" target="_blank" rel="noopener">${esc(r[1])}</a></div>`).join('');
}

function buildSynthesisText(){
  const m = currentModule();
  const lines = [`OpenPsychTools Differential Matrix - ${m.title}`, '', 'Selected findings:'];
  const selected = m.features.filter(f => getAnswer(f.id)!=='unknown');
  if(!selected.length) lines.push('- None marked');
  selected.forEach(f => lines.push(`- ${f.label}: ${getAnswer(f.id)}`));
  const flags = m.features.filter(f => f.urgent && getAnswer(f.id)==='present').map(f=>f.urgent);
  if(flags.length){ lines.push('', 'Safety / medical red flags:'); flags.forEach(x=>lines.push(`- ${x}`)); }
  lines.push('', 'Differential synthesis (not ranked):');
  m.diagnoses.forEach(dx => {
    const supports=[], against=[];
    m.features.forEach(f => { const e=effectFor(f,dx.id); if(e?.[0]==='support') supports.push(f.label); if(e?.[0]==='against') against.push(f.label); });
    lines.push('', dx.name);
    lines.push(`Key question: ${dx.question}`);
    lines.push(`Supports: ${supports.length?supports.join('; '):'none from selected findings'}`);
    lines.push(`Argues against: ${against.length?against.join('; '):'none from selected findings'}`);
    const unresolved=unresolvedForDx(m,dx); lines.push(`Still useful to clarify: ${unresolved.length?unresolved.join('; '):'none listed'}`);
  });
  lines.push('', 'Clinical reasoning aid only. No diagnosis, probability, or treatment recommendation is generated.');
  return lines.join('\n');
}

function renderPrint(){
  const m=currentModule();
  const selected=m.features.filter(f=>getAnswer(f.id)!=='unknown');
  const flags=m.features.filter(f=>f.urgent && getAnswer(f.id)==='present').map(f=>f.urgent);
  $('printReport').innerHTML=`<h1>OpenPsychTools Differential Matrix</h1><h2>${esc(m.title)}</h2><p>${esc(m.description)}</p>
    ${flags.length?`<div class="print-warning"><strong>Safety / medical red flags</strong><ul>${flags.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>`:''}
    <h2>Selected findings</h2>${selected.length?`<ul>${selected.map(f=>`<li>${esc(f.label)}: ${esc(getAnswer(f.id))}</li>`).join('')}</ul>`:'<p>None marked.</p>'}
    <h2>Differential synthesis</h2>${m.diagnoses.map(dx=>{const s=[],a=[];m.features.forEach(f=>{const e=effectFor(f,dx.id);if(e?.[0]==='support')s.push(f.label);if(e?.[0]==='against')a.push(f.label)});const u=unresolvedForDx(m,dx);return `<h3>${esc(dx.name)}</h3><p><strong>Key question:</strong> ${esc(dx.question)}</p><p><strong>Supports:</strong> ${esc(s.join('; ')||'none from selected findings')}</p><p><strong>Argues against:</strong> ${esc(a.join('; ')||'none from selected findings')}</p><p><strong>Still useful to clarify:</strong> ${esc(u.join('; ')||'none listed')}</p>`}).join('')}
    <p><small>Clinical reasoning aid only. No diagnosis, probability, or treatment recommendation is generated.</small></p>`;
}

function renderAll(){ renderNav(); renderHeader(); renderExample(); renderFeatures(); renderSafety(); renderMatrix(); renderSynthesis(); renderRefs(); renderPrint(); }
function toast(msg){ const t=$('toast'); t.textContent=msg; t.classList.remove('hidden'); setTimeout(()=>t.classList.add('hidden'),1800); }

$('clearModuleBtn').addEventListener('click',()=>{ const m=currentModule(); m.features.forEach(f=>delete state.answers[answerKey(m.id,f.id)]); state.exampleActive=false; renderAll(); toast('Matrix cleared'); });
$('resetBtn').addEventListener('click',()=>{ state.answers={}; state.exampleActive=false; renderAll(); toast('All selections cleared'); });
$('exampleBtn').addEventListener('click',loadExample);
$('copyBtn').addEventListener('click',async()=>{ try{ await navigator.clipboard.writeText(buildSynthesisText()); toast('Synthesis copied'); }catch{ toast('Copy failed in this browser'); } });
$('printBtn').addEventListener('click',()=>{ renderPrint(); window.print(); });

renderAll();
if('serviceWorker' in navigator){ window.addEventListener('load',()=>navigator.serviceWorker.register('./service-worker.js').catch(()=>{})); }
