export type Speaker = "Writer" | "Other" | "System";

export type InteractionType =
    | "tap"
    | "hold"
    | "drag"
    | "swipe"
    | "type"
    | "shake"
    | "puzzle"
    | "catch"
    | "connect"
    | "reveal";

export interface DialogueSegment {
    id: string;
    speaker: Speaker;
    text: string;
    emotion?: "neutral" | "sad" | "hopeful" | "intense" | "relief" | "joy" | "dark" | "curious";
    interactionType: InteractionType;
}

export const dialogueData: DialogueSegment[] = [
    {
        id: "1",
        speaker: "Writer",
        text: "It’s strange, isn’t it? Sitting here. It feels like we’re trying to reconnect with people we used to be, not who we are now.",
        emotion: "neutral",
        interactionType: "tap",
    },
    {
        id: "2",
        speaker: "Other",
        text: "I’ve been thinking about that too. Specifically, about those... five months.",
        emotion: "neutral",
        interactionType: "hold",
    },
    {
        id: "3",
        speaker: "Writer",
        text: "Five black and blank months. I’m glad you remember the timeline. I kept track of every single one of those sixty days, hoping it was just a slow sunset, not a permanent eclipse.",
        emotion: "sad",
        interactionType: "swipe",
    },
    {
        id: "4",
        speaker: "Other",
        text: "I didn't mean to leave you in the dark. I truly thought that if I focused on my own... \"self-imperative progress,\" I could build something strong enough for both of us to stand on later. I thought I was protecting you from my own instability.",
        emotion: "sad",
        interactionType: "reveal",
    },
    {
        id: "5",
        speaker: "Writer",
        text: "By disappearing? That’s not protection, that’s a \"pseudo-mission.\" You upgraded your level, but I was still on the ground floor, living in the debris of the old one. I had to explicitly question you just to find out if I still existed in your world.",
        emotion: "intense",
        interactionType: "drag",
    },
    {
        id: "6",
        speaker: "Other",
        text: "I know. I saw your boldness. But you don't understand—I was terrified. I saw you managing, holding it together, and I felt I had to be \"okay\" too. I built a fortress around my own pain because I thought if I let it show, I’d shatter us completely.",
        emotion: "intense",
        interactionType: "type",
    },
    {
        id: "7",
        speaker: "Writer",
        text: "A fortress? I thought it was a peak. I thought you had moved on to a better view, and I was just a ghost in the hallway of your new life.",
        emotion: "sad",
        interactionType: "catch",
    },
    {
        id: "8",
        speaker: "Other",
        text: "A ghost? No. You were the only thing that felt real. But I didn't know how to bridge the gap without seeming fragile. I thought \"restoration\" meant fixing myself first.",
        emotion: "hopeful",
        interactionType: "connect",
    },
    {
        id: "9",
        speaker: "Writer",
        text: "Restoration doesn't work if it’s fragile, I agree. But it also doesn't work if it’s unilateral. I made a wrong decision to wait so long, I realize that now. I should have broken the silence earlier.",
        emotion: "hopeful",
        interactionType: "tap",
    },
    {
        id: "10",
        speaker: "Other",
        text: "You did break it. When you asked me those questions, you broke the glass. I was just waiting for someone to let the air back into the room.",
        emotion: "relief",
        interactionType: "hold",
    },
    {
        id: "11",
        speaker: "Writer",
        text: "So... this isn't just about acknowledging the past? You actually want to do the work?",
        emotion: "hopeful",
        interactionType: "swipe",
    },
    {
        id: "12",
        speaker: "Other",
        text: "The \"collaborational intention.\" Yes. But this time, no more fortress building. We build the bridge together.",
        emotion: "joy",
        interactionType: "drag",
    },
    {
        id: "13",
        speaker: "Writer",
        text: "Stone by heavy stone?",
        emotion: "joy",
        interactionType: "type",
    },
    {
        id: "14",
        speaker: "Other",
        text: "Stone by heavy stone.",
        emotion: "joy",
        interactionType: "hold",
    },
];
