import { FunctionComponent, MouseEventHandler, SVGProps } from "react";

interface SvgButtonProps {
    SvgComponent: FunctionComponent<SVGProps<SVGSVGElement> & {
        title?: string | undefined;
    }>;
    handleButtonClick: MouseEventHandler<HTMLButtonElement>;
}

const SvgButton = ({ SvgComponent, handleButtonClick }: SvgButtonProps) => {
    
    return (
        <button type="button" id="menu-btn" onClick={handleButtonClick}>
            <SvgComponent />
        </button>
    );
};

export default SvgButton;
