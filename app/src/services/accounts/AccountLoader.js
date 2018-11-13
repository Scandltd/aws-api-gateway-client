import accounts from '../../config/aws_config';

/**
 * @todo to be refactored
 */
class AccountLoader
{
    fecthAccounts() {
        return accounts.accounts;
    }
}

export default AccountLoader;