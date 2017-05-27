import base.docker
import nose.tools
import requests
import yaml


class TestConnect:
    def test_connect_to_couchdb(self):
        response = requests.get(
            'http://{}:{}'.format(
                base.docker.machine_ip(),
                5984
            )
        )

        nose.tools.assert_equals(
            response.status_code,
            200
        )

    def test_connect_to_pyramid(self):
        response = requests.get(
            'http://{}:{}'.format(
                base.docker.machine_ip(),
                8080
            )
        )

        nose.tools.assert_equals(
            response.status_code,
            200
        )
