import os
import sys
import tractdb.client
import tractdb.server.accounts
import yaml

sys.path.append(
    os.path.join(
        os.path.dirname(__file__), '..', '..'
    )
)
import base.docker
import tests.data.test_familysleepdata

if __name__ == '__main__':
    #
    # If an account exists in production, we can access that
    #
    # client = tractdb.client.TractDBClient(
    #     tractdb_url='https://tractdb.org/api',
    #     account='familysleep_uidev',
    #     password='familysleep_uidev'
    # )

    #
    # If testing locally, create and populate the account
    #
    with open('tests/test-secrets/couchdb.yml') as f:
        couchdb_secrets = yaml.safe_load(f)
    admin = tractdb.server.accounts.AccountsAdmin(
        couchdb_url='http://{}:{}'.format(
            base.docker.machine_ip(),
            5984
        ),
        couchdb_admin=couchdb_secrets['admin']['user'],
        couchdb_admin_password=couchdb_secrets['admin']['password']
    )
    if 'familysleep_uidev' in admin.list_accounts():
        admin.delete_account('familysleep_uidev')
    admin.create_account('familysleep_uidev', 'familysleep_uidev')

    client = tractdb.client.TractDBClient(
        tractdb_url='http://{}:{}'.format(
            base.docker.machine_ip(),
            8080
        ),
        account='familysleep_uidev',
        password='familysleep_uidev'
    )

    #
    # In either case, here are the documents
    #

    # Delete all current documents, so we start 'fresh'
    for doc in client.get_documents():
        print('D: {}'.format(doc['_id']))

        client.delete_document(doc=doc)

    # Create the documents we expect
    for doc_id, doc in tests.data.test_familysleepdata.TestFamilySleepData(
        date_start='2017-09-01',
        date_end='2017-11-01'
    ).TEST_DATA:
        print('C: {}'.format(doc_id))

        client.create_document(doc_id=doc_id, doc=doc)
