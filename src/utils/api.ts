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

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export class API {
    static verify(): string {
        return `${API_URL}/challenge/verify`;
    }

    static initiateEmailVerification(): string {
        return `${API_URL}/challenge/verify/email/initiate`;
    }

    static verifyByCaptcha(): string {
        return `${API_URL}/challenge/verify/captcha`;
    }

    static announcements(): string {
        return `${API_URL}/announcements`;
    }

    static status() {
        return `${API_URL}/status`;
    }

    static login() {
        return `${API_URL}/auth/login`;
    }

    static reviews(id?: string | number) {
        return `${API_URL}/reviews${
            id === undefined ? "" : `/${encodeURIComponent(id.toString())}`
        }`;
    }

    static rules() {
        return `${API_URL}/rules`;
    }

    static recovery() {
        return `${API_URL}/auth/recovery`;
    }

    static recoveryToken() {
        return `${API_URL}/auth/recovery_token`;
    }

    static reset() {
        return `${API_URL}/auth/reset`;
    }

    static user(userId: string) {
        return `${API_URL}/users/${encodeURIComponent(userId)}`;
    }

    static discord() {
        return `${API_URL}/auth/discord`;
    }

    static config(guildId: string) {
        return `${API_URL}/config/${encodeURIComponent(guildId)}`;
    }

    static permissionRoles(guildId: string, id?: number | string) {
        return (
            `${API_URL}/permission_roles/${encodeURIComponent(guildId)}` +
            (id !== undefined ? `/${encodeURIComponent(id.toString())}` : "")
        );
    }
}
