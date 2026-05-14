// ডাটাবেস: আপনি এখানে ১০০টি আইটেম যোগ করতে পারবেন

const healthData = [
    {
        symptom: "পেট মোচড়ানো",
        diseases: [
            { name: "আমাশয় (Amoebiasis)", probability: "৮০%", medicine: "Metronidazole (500mg)", instruction: "খাওয়ার পর ৫ দিন (দিনে ৩ বার)", sideEffects: "মুখ তিতা হওয়া, বমি ভাব", contra: "লিভারের সমস্যা থাকলে সতর্কতা জরুরি" }
        ]
    },
    {
        symptom: "জ্বর",
        diseases: [
            { name: "ভাইরাল ফিভার", probability: "৯০%", medicine: "Paracetamol (500mg)", instruction: "ভরা পেটে দিনে ৩ বার (সর্বোচ্চ ৩ দিন)", sideEffects: "অ্যালার্জি বা ত্বকে র‍্যাশ", contra: "লিভারের দীর্ঘমেয়াদী রোগ" }
        ]
    },
    {
        symptom: "মাথাব্যথা",
        diseases: [
            { name: "মাইগ্রেন / টেনশন", probability: "৭০%", medicine: "Naproxen (250mg)", instruction: "ভরা পেটে দিনে ২ বার", sideEffects: "গ্যাস্ট্রিকের সমস্যা হতে পারে", contra: "কিডনি বা পাকস্থলীর আলসার" }
        ]
    },
    {
        symptom: "শুষ্ক কাশি",
        diseases: [
            { name: "অ্যালার্জিজনিত কাশি", probability: "৬০%", medicine: "Fexofenadine (120mg)", instruction: "রাতে শোবার আগে ১টি", sideEffects: "সামান্য ঘুম ঘুম ভাব", contra: "কিডনি ফেইলিউর" }
        ]
    },
    {
        symptom: "গলা ব্যথা",
        diseases: [
            { name: "টনসিলাইটিস", probability: "৭৫%", medicine: "Azithromycin (500mg)", instruction: "খাওয়ার ১ ঘণ্টা আগে (৩-৫ দিন)", sideEffects: "পেটে ব্যথা, ডায়রিয়া", contra: "হৃদরোগের ঔষধ সেবনকারী" }
        ]
    },
    {
        symptom: "বমি বমি ভাব",
        diseases: [
            { name: "অজীর্ণ বা বদহজম", probability: "৬৫%", medicine: "Domperidone (10mg)", instruction: "খাওয়ার ১৫-৩০ মিনিট আগে", sideEffects: "মুখ শুকিয়ে যাওয়া", contra: "পিটুইটারি টিউমার" }
        ]
    },
    {
        symptom: "বুক জ্বালাপোড়া",
        diseases: [
            { name: "এসিডিটি / রিফ্লাক্স", probability: "৮৫%", medicine: "Esomeprazole (20mg)", instruction: "সকালে ও রাতে খালি পেটে", sideEffects: "কোষ্ঠকাঠিন্য বা পাতলা পায়খানা", contra: "হাইপোম্যাগনেসেমিয়া" }
        ]
    },
    {
        symptom: "শরীরের জয়েন্টে ব্যথা",
        diseases: [
            { name: "আর্থ্রাইটিস বা বাত", probability: "৫০%", medicine: "Aceclofenac (100mg)", instruction: "ভরা পেটে প্রতিদিন ২ বার", sideEffects: "পাকস্থলীতে ক্ষত তৈরি হতে পারে", contra: "অ্যাজমা বা হাঁপানি রোগী" }
        ]
    },
    {
        symptom: "চোখ লাল হওয়া",
        diseases: [
            { name: "কনজাংটিভাইটিস (চোখ ওঠা)", probability: "৮০%", medicine: "Moxifloxacin Eye Drops", instruction: "প্রতি চোখে ১ ফোঁটা (দিনে ৪ বার)", sideEffects: "চোখে সাময়িক জ্বালাপোড়া", contra: "চোখের ড্রপে অ্যালার্জি থাকলে" }
        ]
    },
    {
        symptom: "সর্দি বা নাক বন্ধ",
        diseases: [
            { name: "সাধারণ সর্দি (Common Cold)", probability: "৯৫%", medicine: "Desloratadine (5mg)", instruction: "রাতে ১টি", sideEffects: "ক্লান্তি ভাব", contra: "মদ্যপানরত অবস্থা" }
        ]
    }
];

// বাকি লজিক (Search, Render Chips, Results) আগের মতোই থাকবে।

let selectedSymptoms = [];

const input = document.getElementById('symptomInput');
const suggestions = document.getElementById('suggestions');
const chipContainer = document.getElementById('selectedSymptoms');
const resultArea = document.getElementById('resultArea');

// সার্চ সাজেশন লজিক
input.addEventListener('input', () => {
    const val = input.value.toLowerCase();
    suggestions.innerHTML = '';
    if (!val) return;

    const filtered = healthData.filter(d => d.symptom.includes(val));
    filtered.forEach(item => {
        const div = document.createElement('div');
        div.className = 'suggestion-item';
        div.innerText = item.symptom;
        div.onclick = () => addSymptom(item.symptom);
        suggestions.appendChild(div);
    });
});

function addSymptom(symptom) {
    if (!selectedSymptoms.includes(symptom)) {
        selectedSymptoms.push(symptom);
        renderChips();
        renderResults();
    }
    input.value = '';
    suggestions.innerHTML = '';
}

function removeSymptom(symptom) {
    selectedSymptoms = selectedSymptoms.filter(s => s !== symptom);
    renderChips();
    renderResults();
}

function renderChips() {
    chipContainer.innerHTML = selectedSymptoms.map(s => 
        `<div class="chip">${s} <span onclick="removeSymptom('${s}')">×</span></div>`
    ).join('');
}

function renderResults() {
    resultArea.innerHTML = '';
    if (selectedSymptoms.length === 0) return;

    selectedSymptoms.forEach(s => {
        const data = healthData.find(d => d.symptom === s);
        if (data) {
            data.diseases.forEach(d => {
                const card = document.createElement('div');
                card.className = 'result-card';
                card.innerHTML = `
                    <h3>সম্ভাব্য রোগ: ${d.name} <span class="probability">(${d.probability})</span></h3>
                    <p><strong>ঔষধ:</strong> ${d.medicine}</p>
                    <p><strong>নির্দেশনা:</strong> ${d.instruction}</p>
                    <p><strong>পার্শ্বপ্রতিক্রিয়া:</strong> ${d.sideEffects}</p>
                    <p><strong>প্রতিনির্দেশনা:</strong> ${d.contra}</p>
                `;
                resultArea.appendChild(card);
            });
        }
    });
}
