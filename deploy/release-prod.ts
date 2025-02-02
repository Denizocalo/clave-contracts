/**
 * Copyright Clave - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */
import type { HardhatRuntimeEnvironment } from 'hardhat/types';

import deployBatchCaller from './deploy-batch-caller';
import deployCloudRecovery from './deploy-cloud-recovery';
import deployFactory from './deploy-factory';
import deployImplementation from './deploy-implementation';
import deployPaymaster from './deploy-paymaster';
import deployRegistry from './deploy-registry';
import deploySocialRecovery from './deploy-social-recovery';
import deployTeeValidator from './deploy-tee-validator';
import { ReleaseType } from './helpers/release';

export default async function (hre: HardhatRuntimeEnvironment): Promise<void> {
    const batchCaller = await deployBatchCaller(hre, ReleaseType.production);
    const implementation = await deployImplementation(
        hre,
        ReleaseType.production,
        batchCaller,
    );
    const registry = await deployRegistry(hre, ReleaseType.production);
    await deployFactory(hre, ReleaseType.production, implementation, registry);
    await deployTeeValidator(hre, ReleaseType.production);
    await deploySocialRecovery(hre, ReleaseType.production);
    await deployCloudRecovery(hre, ReleaseType.production);
    await deployPaymaster(hre, ReleaseType.production, registry);
}
