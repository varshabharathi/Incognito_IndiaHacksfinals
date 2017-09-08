# IndiaHacks Finals

# Trade Finance on Blockchain
This repository contains our submission for the 2017 IndiaHacks Hackathon

# Introduction

We have developed a blockchain application that digitizes the Letter of Credit document which is widely used in trade. All stakeholders will be able to view the current status of the Letter of Credit and this will improve transparency and efficiency.

# Compatibility

This code has been tested on Ubuntu 16.04 LTS

# Dependencies:

Docker Engine: Version 17.03 or higher
Docker-Compose: Version 1.8 or higher
Node: 6.x (Version 7 not supported)
npm: 3.10.x
git: 2.9.x
Hyperledger Fabric 1.0

# Status of the Letter of Credit

This prototype allows the different stakeholders to view the current status of the Letter of Credit.

IssuebyIB : This enumeration takes a value of "Pending" or "Done" based on whether the Letter of Credit has been issued by the Issuing Bank

ApprovalbyAB : This enumeration takes a value of "Pending" or "Done" based on whether the Letter of Credit has been approved by the Approving Bank

SellerDocupNotification : This enumeration takes a value of "Yet_to_be_notified" or "Notified_to_upload" based on whether the seller has been notified to upload documents for transfer of ownership

ComplibyNB : This enumeration takes a value of "Pending" or "Done" based on whether the Nominated bank has completed the compliance check. Once this check is done, money is transferred to the seller by the issuing bank via the blockchain.

ComplibIB : This enumeration takes a value of "Pending" or "Done" based on whether the Issuing bank has completed the compliance check.

DoctoBuyer : This enumeration takes a value of "Pending" or "Done" based on whether the Issuing Bank has transferred the documents. Once this check is done, money is transferred by the buyer to the Issuing Bank.

# Usage

Refer to the Hyperledger Development Tutorial (https://hyperledger.github.io/composer/installing/development-tools.html) to download the installation tools

Clone the repository

Refer to the Hyperledger Developer Guide (https://hyperledger.github.io/composer/tutorials/developer-guide.html)

Use the command (composer network deploy -a my-network.bna -p hlfv1 -i PeerAdmin -s randomString) after switching to the directory with the BNA file.

Follow the guide to generate the REST API and Angular application.

# References

https://hyperledger.github.io/composer/index.html

