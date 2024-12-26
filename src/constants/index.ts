import { LANG } from "./language";

export const MATCH_TYPE = ['Erstmalige Spielerlaubnis', 'Vereinswechsel'];

export const ARGENTINA_NATIONALITY = ['Argentinean', 'Brazilian', 'Mexican', 'American'];

export const ISTUPNICA_OR_BRISOVNICA_NATIONALITY = ['Bosnian', 'North Korean', 'South Korean', 'Macedonian', 'Montenegro', 'Serbian'];


export const TAB_MENU = [
    { id: 1, name: LANG.ACCOUNT_SETTING, eventKey: 'accountSetting', icon: 'AccountSetting' },
    { id: 2, name: LANG.CHANGE_PASSWORD, eventKey: 'changePassword', icon: 'ChangePassword' },
    { id: 3, name: LANG.SUBSCRIPTION, eventKey: 'subscription', icon: 'Subscription' },
    { id: 4, name: LANG.HELP_AND_SUPPORT, eventKey: 'support', icon: 'Support' }
]
export interface INTERFACE_TAB_MENU {
    id: number;
    name: string;
    eventKey: string;
    icon: string;
}


export const BLOOD_GROUP_LIST = [
    "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"
]

export const FILE_EXT = ".pdf,.doc,.docx";


export const GENDERS = ['männlich', 'weiblich'];


export const EVENTS_STATUS = [
    { value: "scheduled", label: "Scheduled" },
    { value: "completed", label: "Completed" },
    { value: "canceled", label: "Canceled" },
];

export const EVENTS_TYPE = [
    { value: "match", label: "Match" },
    { value: "training", label: "Training" },
    { value: "practice", label: "Practice" },
];

export const EVENTS_DURATION = [
    { value: "one_day", label: "One Day" },
    { value: "one_week", label: "One Week" },
    { value: "two_week", label: "Two Week" },
    { value: "three_week", label: "Three Week" },
    { value: "one_month", label: "One Month" },
];


export const TIMES_DURATION = [
    { value: "1", label: "1 Hr", min:"60" },
    { value: "2", label: "2 Hrs", min:"120" },
    { value: "3", label: "3 Hrs", min:"180"},
    { value: "4", label: "4 Hrs", min:"240" },
    { value: "5", label: "5 Hrs", min:"300" },
    { value: "6", label: "6 Hrs", min:"360" },
    { value: "7", label: "7 Hrs", min:"420" },
    { value: "8", label: "8 Hrs", min:"480" },
];

export const ROOM_TYPES = [
    { value: "field", label: "Field" },
    { value: "room", label: "Room" }
];

export const PARTICIPANTS_TYPES = [
    { value: "individual", label: "Individual participants" },
    { value: "team", label: "Teams" }
];

export const EVENTS_DURATION_OBJ:any = {
    "one_day": "One Day",
    "one_week": "One Week",
    "two_week": "Two Week",
    "three_week": "Three Week",
    "one_month": "One Month",
}
