
export enum ShimmerEffectTypes {
    SHIMMER,
    BREATHING
}


export class Std {

    public static nouns(numb: number, text: string) {
        return numb > 1 ? `${numb} ${text}s` : `${numb} ${text}`
    }


}