import { Card, CardContent, Chip, Slider, TextField } from "@mui/material";
import { FC } from "react";
import SettingsCardComponentProps from "../types/SettingsCardComponentProps";
import Switch from "./Switch";

interface AIModCardProps extends SettingsCardComponentProps {
    aiModData: any;
}

const AIModCard: FC<AIModCardProps> = ({ register, aiModData }) => {
    console.log(aiModData);

    return (
        <Card>
            <CardContent>
                <div className="flex items-center justify-between">
                    <h2>
                        AI Moderation System <Chip label="Beta" />
                    </h2>
                    <Switch
                        defaultChecked={aiModData.enabled}
                        {...register("ai_mod.enabled")}
                    />
                </div>

                <br />
                
                <p>
                    Automatically moderates the messages using AI moderation
                    technology.
                </p>

                <br />
                <br />

                <div>
                    <div className="pr-3">
                        <label htmlFor="toxicity">Maximum Toxicity</label>
                        <Slider
                            id="toxicity"
                            className="mx-2"
                            min={0}
                            max={100}
                            step={1}
                            valueLabelDisplay="auto"
                            defaultValue={aiModData.toxicity * 100}
                            {...register("ai_mod.toxicity", { required: true }) as any}
                        />
                    </div>

                    <br />
                    <br />

                    <div className="pr-3">
                        <label htmlFor="severe_toxicity">Maximum Severe Toxicity</label>
                        <Slider
                            id="severe_toxicity"
                            className="mx-2"
                            min={0}
                            max={100}
                            step={1}
                            valueLabelDisplay="auto"
                            defaultValue={aiModData.severe_toxicity * 100}
                            {...register("ai_mod.severe_toxicity", { required: true }) as any}
                        />
                    </div>

                    <br />
                    <br />

                    <div className="pr-3">
                        <label htmlFor="threat">Maximum Threat</label>
                        <Slider
                            id="threat"
                            className="mx-2"
                            min={0}
                            max={100}
                            step={1}
                            valueLabelDisplay="auto"
                            defaultValue={aiModData.threat * 100}
                            {...register("ai_mod.threat", { required: true }) as any}
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default AIModCard;
