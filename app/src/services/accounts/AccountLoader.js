import accounts from '../../config/aws_config';

/**
 * @todo to be refactored
 */
class AccountLoader
{
    fetchAccounts() {
        return accounts.accounts;
    }
}

export default AccountLoader;