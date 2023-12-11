"use client";

import { VerificationMethod as VerificationMethodEnum } from "@/contexts/VerificationWizardContext";
import useVerificationContext from "@/hooks/useVerificationContext";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { useEffect } from "react";
import { FaEnvelope, FaGithub, FaGoogle, FaPuzzlePiece } from "react-icons/fa6";
import styles from "../../styles/VerificationMethods.module.css";
import VerificationMethod from "./VerificationMethod";
import VerificationStep from "./VerificationStep";

export default function VerificationSteps() {
    const { next, step, lastAction, setMethod } = useVerificationContext();
    const [sliderRef, instanceRef] = useKeenSlider(
        {
            slideChanged() {
                console.log("slide changed");
            },
            drag: false,
        },
        []
    );

    useEffect(() => {
        if (lastAction === "back") {
            instanceRef.current?.prev();
        } else if (lastAction === "next") {
            instanceRef.current?.next();
        }
    }, [step]);

    const onClick = () => {
        next();
    };

    return (
        <div className="md:mx-0 max-w-[90vw] w-[90vw] md:w-[40vw] lg:w-[25vw] xl:w-[17vw] shadow-[0_0_2px_0_rgba(255,255,255,0.5)] rounded-[10px]">
            <div ref={sliderRef} className="keen-slider rounded-[10px]">
                <div className="keen-slider__slide rounded-[10px] w-[90vw] md:w-[40vw] lg:w-[25vw] xl:w-[17vw]">
                    <div className={styles.methods}>
                        <VerificationMethod
                            name="Google"
                            description="Verify using your Google account."
                            icon={FaGoogle}
                            disabled
                        />
                        <VerificationMethod
                            name="GitHub"
                            description="Verify using your GitHub account."
                            icon={FaGithub}
                            disabled
                        />
                        <VerificationMethod
                            name="Email"
                            description="Verify using your Email Address."
                            icon={FaEnvelope}
                            disabled
                        />
                        <VerificationMethod
                            name="Captcha"
                            description="Verify by solving a Captcha."
                            icon={FaPuzzlePiece}
                            onClick={() => {
                                setMethod(VerificationMethodEnum.Captcha);
                                onClick();
                            }}
                        />
                    </div>
                </div>
                <VerificationStep
                    step={1}
                    callback={() => (
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Nulla voluptas modi illum ducimus tempore hic
                            porro odio exercitationem ea voluptatem.
                        </p>
                    )}
                />
            </div>
        </div>
    );
}
