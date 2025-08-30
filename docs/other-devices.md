# Jellyfin

Jellyfin has numerous other [clients](https://jellyfin.org/downloads/), not all of which have been tested at the time of writing. If you are able to test (successfully or unsucessfully) an app not documented in this guide, your feedback would be much appreciated.

## Swiftfin Apple tvOS

Before using Swiftfin, you need to install and trust a StartOS root CA certificate on your Apple TV for secure local HTTPS connections (If you have not pointed a public domain name to your Jellyfin service).

1. On your Apple TV, go to Settings > General > Profiles.

2. Choose "Add Profile" and enter your URL: `http://[YOUR SERVER IP]/static/local-root-ca.crt`

3. Follow the prompts to install the certificate.

4. Next, navigate to Settings > General > About > Certificate Trust Settings, find your new certificate, and set it to `Trusted`.

Now download [Swiftfin](https://apps.apple.com/us/app/swiftfin/id1604098728?platform=appleTV) client on your tvOS from appstore.

1. Upon opening the client, you will be prompted to add server. Click `Connect`.

2. Next, you will be prompted for a server address. Paste your preferred interface URL from Jellyfin service interfaces (`Services -> Jellyfin -> Interfaces`) and click `Connect`.

3. Finally, enter your username and password and click `Connect`.
