fetch('data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erreur ! Statut : ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        setHeader(data.profile);
        feedProfileData(data.profile);
        feedLanguageSkill(data.hardskill[0]);
        feedFrameworkSkill(data.hardskill[1]);
        feedCmsSkill(data.hardskill[2]);
        feedSoftwareSkill(data.hardskill[3]);
        feedSoftskill(data.softskill);
        feedExperiences(data.experience);
        feedTrainingBackground(data.training_background);
        feedMisc(data.langage, data.interests);
    })
    .catch(error => console.error("Erreur de traitement du JSON :", error))
;

function setHeader(profile) {

    document.getElementById('fullname').innerHTML = profile.firstname +' '+ profile.lastname;
    document.getElementById('image-profile').src = profile.image_profile;

}

function getFullDate()
{
    const days = ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];
    const months = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
    const now = new Date();
    const day = days[now.getDay()];
    const date = now.getDate();
    const month = (months[now.getMonth()]).toLowerCase();
    const year = now.getFullYear();
    return day + ' ' + date + ' ' + month + ' ' + year;
}

function updateTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const timeString = `${hours}h${minutes}`;
    document.getElementById('clock').textContent = "🕙 "+ timeString;
}

function getActionLocation() {
    const now = new Date();
    const hours = now.getHours();
    const day = now.getDay();
    switch (true){
        case 0===day || 6===day: return 'en weekend, à la maison.'
        case 16 < hours || 8 > hours: return 'dispo, à la maison.';
        case 3===day && 12 >= hours: return 'en télétravail, à la maison.'
        default: return 'au travail, Les Cars.'
    }
}


function feedProfileData(profile){

    let el = document.getElementById('profile-data');
    el.innerHTML = "<h3 class='header-profile'>📆 "+ getFullDate() +"<br>" +
        "<span>📍 "+ getActionLocation() +"</span><br>" +
        "<span id='clock'></span>" +
        "</h3>" +
        "<div class='body-profile'>" +
        "<button class='btn-cta active'>"+ profile.phone +"</button>" +
        "<button class='btn-cta'>"+ profile.email +"</button>" +
        // "<button class='btn-cta'>"+ profile.address +" "+ profile.zip +", "+ profile.city +"</button>" +
        "</div>"
    ;
    el.innerHTML+= "<span>"+ profile.address +"</span>";
    el.innerHTML+= "<span>"+ profile.zip +", "+ profile.city +"</span>";
    el.innerHTML+= "<span></span>";
    el.innerHTML+= "<span>"+ profile.birthday +"</span>";

    // engaged
    // children
    // driver_license
    // vehicle

    setInterval(updateTime, 60000);
    updateTime();
}

function feedLanguageSkill(language)
{
    let el = document.getElementById('skill-language');
    el.innerHTML = (language.details)
        .map(function (obj) {
            let url = obj.icon_url;
            let label = obj.label;
            let pourcent = obj.level;

            return "<li><div class='progress-bar' style='width: "+ pourcent +"%'>" +
                "</div><img class='rounded-icon' src='" + url + "' alt='logo " + (label).toLowerCase() + "'/><span style='z-index: 1'>" + label + "</span></li>";
        })
        .reduce(function (prev, item) {
            return prev + item;
        })
    ;
}

function feedFrameworkSkill(framework)
{
    let el = document.getElementById('skill-framework');
    el.innerHTML = (framework.details)
        .map(function (obj) {
            let url = obj.icon_url;
            let label = obj.label;
            let version = obj.version;

            // return "<li><img class='rounded-icon' src='" + url + "' alt='logo " + (label).toLowerCase() + "'/>" +
            return "<li><h6>"+ label +"</h6>" +
                "<span>"+ version +"</span></li>";
        })
        .reduce(function (prev, item) {
            return prev + item;
        })
    ;
}

function feedCmsSkill(cms)
{
    let today = new Date().getFullYear();
    let el = document.getElementById('skill-cms');
    el.innerHTML = (cms.details)
        .map(function (obj) {
            let url = obj.icon_url;
            let label = obj.label;
            let experience = today - obj.xp;

            // return "<li><img class='rounded-icon' src='" + url + "' alt='logo " + (label).toLowerCase() + "'/>" +
            return "<li><h6>"+ label +"</h6>" +
                "<span>xp: "+ experience +" ans</span></li>";
        })
        .reduce(function (prev, item) {
            return prev + item;
        })
    ;
}

function feedSoftwareSkill(software)
{
    let el = document.getElementById('skill-software');
    el.innerHTML = (software.details)
        .map(function (obj) {
            let url = obj.icon_url;
            let label = obj.label;
            let size = '';
            if(typeof obj.icon_size != 'undefined') size = obj.icon_size;
            return "<div class='card-icon'>" +
                "<img class='' style='"+ size +"' src='" + url + "' alt='logo " + (label).toLowerCase() + "'/>" +
                "<span>"+ label +"</span>" +
                "</div>";
        })
        .reduce(function (prev, item) {
            return prev + item;
        })
    ;
}

function feedSoftskill(softskill)
{
    let el = document.getElementById('skill-softskill');
    el.innerHTML = softskill
        .map(function (obj) {
            let title = obj.title;
            let details = obj.details;
            
            let detailsHtml = details
                .map(function(detail) {
                    return "<span class='skill-detail'>" + detail + "</span>";
                })
                .join('');
            
            return "<div class='softskill-card'>" +
                "<h6 class='softskill-title'>" + title + "</h6>" +
                "<div class='softskill-details'>" + detailsHtml + "</div>" +
                "</div>";
        })
        .reduce(function (prev, item) {
            return prev + item;
        })
    ;
}

function feedExperiences(experiences)
{
    let el = document.getElementById('experience-list');
    el.innerHTML = experiences
        .map(function (obj) {
            let period = obj.to ? obj.from + " - " + obj.to : obj.from;
            let detailsHtml = obj.details
                .map(function(detail) {
                    return "<li class='experience-detail'>" + detail + "</li>";
                })
                .join('');
            
            return "<div class='experience-card'>" +
                "<div class='experience-header'>" +
                "<h6 class='experience-title'>" + obj.label + "</h6>" +
                "<span class='experience-period'>" + period + "</span>" +
                "</div>" +
                "<span class='experience-location'>📍 " + obj.location + "</span>" +
                "<ul class='experience-details'>" + detailsHtml + "</ul>" +
                "</div>";
        })
        .join('')
    ;
}

function feedTrainingBackground(training)
{
    let el = document.getElementById('training-list');
    el.innerHTML = training
        .map(function (obj) {
            let period = obj.to ? obj.from + " - " + obj.to : obj.from;
            
            return "<div class='experience-card'>" +
                "<div class='experience-header'>" +
                "<h6 class='experience-title'>" + obj.label + "</h6>" +
                "<span class='experience-period'>" + period + "</span>" +
                "</div>" +
                "<div class='experience-details'>" +
                "<span class='experience-detail'>" + obj.details + "</span>" +
                "</div>" +
                "</div>";
        })
        .join('')
    ;
}

function feedMisc(languages, interests)
{
    let languageEl = document.getElementById('language-list');
    languageEl.innerHTML = languages
        .map(function(lang) {
            return "<div class='language-item'>" +
                "<span class='language-flag'>" + lang.flag + "</span>" +
                "<span class='language-name'>" + lang.label + "</span>" +
                "<span class='language-level'>" + lang.level + "</span>" +
                "</div>";
        })
        .join('');
    
    let interestsEl = document.getElementById('interests-list');
    interestsEl.innerHTML = interests
        .map(function(interest) {
            return "<div class='interest-item'>" + interest + "</div>";
        })
        .join('');
}