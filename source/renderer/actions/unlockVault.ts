import { ipcRenderer } from "electron";
import { VaultSourceID } from "buttercup";
import { getPrimaryPassword } from "./password";
import { setBusy } from "../state/app";
import { showError } from "../services/notifications";
import { logInfo } from "../library/log";
import { t } from "../../shared/i18n/trans";

export async function unlockVaultSource(sourceID: VaultSourceID): Promise<boolean> {
    const password = await getPrimaryPassword(sourceID);
    if (!password) return false;
    setBusy(true);
    logInfo(`Unlocking source: ${sourceID}`);
    try {
        await ipcRenderer.invoke("unlock-source", sourceID, password);
    } catch (err) {
        showError(
            `${t("notification.error.vault-unlock-failed")}: ${
                err?.message ?? t("notification.error.unknown-error")
            }`
        );
        setBusy(false);
        return await unlockVaultSource(sourceID);
    }
    setBusy(false);
    logInfo(`Unlocked source: ${sourceID}`);
    return true;
}
