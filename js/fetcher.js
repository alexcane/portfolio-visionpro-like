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
        "<button class='btn-cta active glow-on-hover'>"+ profile.phone +"</button>" +
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