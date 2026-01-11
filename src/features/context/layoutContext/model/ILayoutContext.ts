export default interface ILayoutContext {
    isMainShifted: boolean;
    setIsMainShifted: (value: boolean) => void;

    isHeroPage: boolean;
    setIsHeroPage: (value: boolean) => void;
}