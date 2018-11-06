import accounts from '../../config/aws_config';

/**
 * @todo to be refactored
 */
class AccountLoader
{
    getAccounts() {
        return accounts.accounts;
    }
}

export default AccountLoader;