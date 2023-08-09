import { AccessType } from "./core/enums/main";

export class Utility {

    static getNigeriaState(label = " |Choose A State") {
        return [
            label,
            "enugu|Enugu State",
            "imo|Imo State",
            "fct|Federal Capital Territory",
            "akwa ibom|Akwa Ibom State",
            "ogun|Ogun state",
            "rivers|Rivers State",
            "kaduna|Kaduna State",
            "lagos|Lagos State"
            , "abia|Abia State",
            "anambra|Anambra State"
            , "kano|Kano State",
            "cross river|Cross River State",
            "delta|Delta State",
            "kwara|Kwara State",
            "osun|Osun State",
            "borno|Borno State",
            "nasarawa|Nasarawa State",
            "oyo|Oyo State",
            "niger|Niger State",
            "adamawa|Adamawa State",
            "edo|Edo State",
            "bayelsa|Bayelsa State",
            "kebbi|Kebbi State",
            "ondo|Ondo State",
            "bauchi|Bauchi State"
        ];
    }
    static parseErrors(data) {
        let errors = "";
        for (let key in data) {
            let md = data[key];
            for (let j = 0; j < md.length; j++) {
                if (errors === "") errors = md[j]
                else errors += `=${md[j]}`
            }
        }
        return errors.split("=");
    }

    static getKenyaState(label = " |Choose A State") {
        return [label,
            "central|Central",
            "coast|Coast",
            "eastern|Eastern",
            "nairobi|Nairobi",
            "north eastern|North Eastern",
            "nyanza|Nyanza",
            "rift valley|Rift Valley",
            "western|Western"
        ]

    }

    static getGhanaStates(label = " |Choose A State") {
        return [label, "ashanti|ASHANTI", "kumasi|KUMASI",
            "bono east|BONO EAST", "techiman|TECHIMAN",
            "brong|BRONG", "ahafo|AHAFO", "sunyani|SUNYANI",
            "central|CENTRAL", "cape coast|CAPE COAST"]
    }
    static getCountry(label = " |Choose A Country") {
        return [
            label,
            "nigeria|Nigeria",
            "ghana|Ghana",
            "kenya|Kenya"
        ];
    }


    static login(context, data = null) {
        try {
            let user = localStorage.getItem("user");
            user = JSON.parse(user);
            user.mail_verified = data.mail_verified;
            context.setApp({ ...context.app, profile: user, application: data.user.application });
        } catch (e) {
            if (this.isDev()) {
                console.log(e)
            } else {
                //do nothing
            }
            console.log(e)
        }
    }

    static logout() {
        if (localStorage.getItem("user") !== null) {
            localStorage.removeItem("user");
        }
    }

    static isDev() {
        return document.location.hostname !== "localhost"
    }

    static validEmail(email) {
        var level1 = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
        let valid = level1.test(email);
        if (!valid) {
            ["gmail.com", "hotmail.com", "yahoo.com", "ngshuttle.com"].forEach((e, i) => {
                if (!valid) {
                    var level2 = new RegExp(`[a-z0-9]+@${e}`);
                    valid = level2.test(email)
                }

            });
        }
        return valid;
    }

    static save(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    }

    static accessNamesToEnum(name) {
        name = `${name}`.toLowerCase();
        if (name === "guest") return AccessType.Guest;
        if (name === "authenticated") return AccessType.Authenticated;
        if (name === "admin") return AccessType.Admin;
        if (name === "master") return AccessType.Master;

    }
    static required(value) {
        return value !== "" && value !== undefined && `${value}`.length > 0;
    }
    static email(value) {
        return this.validEmail(value);
    }
    static url(value) {
        const pattern = new RegExp(
            '^([a-zA-Z]+:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', // fragment locator
            'i'
        );
        return pattern.test(value);
    }
    static phone(value) {
        return true
    }
    static image(value, rule = { min: 1, fileType: "image", max: 10, ex: ["png", "jpg", "webp", "jpeg", "gif"] }) {
        let allUploads = value.target.files;
        let ferr = []; let mfiles = []; let blobs = [];
        for (let i = 0; i < allUploads.length; i++) {
            const upload = allUploads[i];
            const name = upload.name;
            const type = upload.type.toLowerCase();
            if (rule.ex.indexOf(type) === -1) {
                ferr.push(`${name} is not ${rule.fileType ?? "image"}`);
                continue;
            }
            const sizex = upload.size / 1024 / 1024
            if (sizex < rule.min) {
                ferr.push(`${name} is too small! minimium file size is ${rule.min}MB`)
                continue;
            } else
                if (sizex > rule.max) {
                    ferr.push(`${name} is too big! maximium file size is ${rule.min}MB`)
                    continue
                }
            mfiles.push({ [value.target.name + `-${i}`]: upload })
            blobs.push(URL.createObjectURL(upload));
        }
        return { blobs: blobs, files: mfiles };
    }


}