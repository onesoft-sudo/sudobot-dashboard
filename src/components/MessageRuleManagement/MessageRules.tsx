/*
 * This file is part of SudoBot Dashboard.
 *
 * Copyright (C) 2021-2023 OSN Developers.
 *
 * SudoBot Dashboard is free software; you can redistribute it and/or modify it
 * under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * SudoBot Dashboard is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with SudoBot Dashboard. If not, see <https://www.gnu.org/licenses/>.
 */

import { APIMessageRule } from "@/types/APIMessageRule";
import { Modal, ModalContent, ModalHeader } from "@nextui-org/react";
import { Dispatch, FC, SetStateAction } from "react";
import MessageRule from "./MessageRule";
import MessageRuleCreateForm from "./MessageRuleCreateForm";

interface MessageRulesProps {
    rules: APIMessageRule[];
    createFormOpenState: [boolean, Dispatch<SetStateAction<boolean>>];
}

const MessageRules: FC<MessageRulesProps> = ({
    rules,
    createFormOpenState,
}) => {
    const [modalOpen, setModalOpen] = createFormOpenState;

    return (
        <div>
            <Modal
                backdrop={"blur"}
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                isDismissable={false}
                scrollBehavior="inside"
            >
                <ModalContent>
                    {onClose => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Create Message Rule
                            </ModalHeader>

                            <MessageRuleCreateForm
                                onCancel={onClose}
                                onDone={onClose}
                            />
                        </>
                    )}
                </ModalContent>
            </Modal>
            <div>
                {rules.map((rule, i) => (
                    <MessageRule key={`${i}_${rule.type}`} rule={rule} />
                ))}
            </div>
        </div>
    );
};

export default MessageRules;
