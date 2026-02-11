import { DialogueSegment } from "./dialogue";

export const introYes: DialogueSegment[] = [
    {
        id: "intro-y-1",
        speaker: "Writer",
        text: "So you know what it's like. To build something and let it sit there, waiting for a visitor who might never come.",
        emotion: "neutral",
        interactionType: "tap"
    },
    {
        id: "intro-y-2",
        speaker: "Other",
        text: "Collecting dust in the digital wind. Yes. But we are here now.",
        emotion: "neutral",
        interactionType: "hold"
    }
];

export const introNo: DialogueSegment[] = [
    {
        id: "intro-n-1",
        speaker: "Writer",
        text: "Then this is new for you. A space that only exists because we are looking at it right now.",
        emotion: "curious", // You might need to add this emotion to your type definition if strict, or map it to neutral
        interactionType: "tap"
    },
    {
        id: "intro-n-2",
        speaker: "Other",
        text: "A blank slate. Just like we were before the crash.",
        emotion: "neutral",
        interactionType: "hold"
    }
];
