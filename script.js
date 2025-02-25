fetch('data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erreur ! Statut : ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        feedLanguageSkill(data.hardskill[0]);
        feedFrameworkSkill(data.hardskill[1]);
        feedCmsSkill(data.hardskill[2]);
        feedSoftwareSkill(data.hardskill[3]);
    })
    .catch(error => console.error("Erreur de traitement du JSON :", error))
;

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
        .map(function (item) {
            return "<li>"+ item +"</li>";
        })
        .reduce(function (prev, item) {
            return prev + item;
        })
    ;
}