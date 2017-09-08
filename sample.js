/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Sample transaction processor function.
 *@param {org.acme.mynetwork.IBissue} ibissue - transaction instance for issuing of LOC by issuing bank.
 *@transaction
 */
function ibissue(ibissue) {
   var loc = ibissue.loc;
   loc.iibtype = 'Done';
      return getAssetRegistry('org.acme.mynetwork.LOC')
        .then(function(iibtypeRegistry) {
            return iibtypeRegistry.update(ibissue.loc);
        });
}

/**
 * Sample transaction processor function.
 *@param {org.acme.mynetwork.ABapproval} abapproval - transaction instance for approval of created LOC by advising bank and notifying exporter.
 *@transaction
 */
function abapproval(abapproval) {
   var loc = abapproval.loc;
   var stat_iib = loc.iibtype;
   if (stat_iib=="Done"){
   loc.aabtype = 'Done';
   loc.selnottype = 'Notified_to_upload';
   }
      return getAssetRegistry('org.acme.mynetwork.LOC')
        .then(function(aabtypeRegistry) {
            return aabtypeRegistry.update(abapproval.loc);
        });
   }

/**
 * Sample transaction processor function.
 *@param {org.acme.mynetwork.Sellerdocup} sellerdocup - transaction instance for document uploading by exporter.
 *@transaction
 */
function sellerdocup(sellerdocup) {
   var loc = sellerdocup.loc;
   var stat_iib = loc.iibtype;
   var stat_aab = loc.aabtype;
   if ((stat_iib=="Done") && (stat_aab=="Done") ){
   loc.edutype = 'Done';
   }
      return getAssetRegistry('org.acme.mynetwork.LOC')
        .then(function(edutypeRegistry) {
            return edutypeRegistry.update(sellerdocup.loc);
        });
}

/**
 * Sample transaction processor function.
 *@param {org.acme.mynetwork.NBcompli} nbcompli - transaction instance for compliance check of exporter document by nominated bank & fund transfer.
 *@transaction
 */
function nbcompli(nbcompli) {
   var loc = nbcompli.loc;
   var stat_iib = loc.iibtype;
   var stat_aab = loc.aabtype;
   var stat_edu = loc.edutype;
   var seller1 = nbcompli.seller;
   var ib1=nbcompli.ib;
   var amount=loc.amount;
   if ((stat_iib=="Done") && (stat_aab=="Done") && (stat_edu=="Done")){
   loc.ccnbtype = 'Done';
   ib1.balance-=amount;
   seller1.balance+=amount;
   
   }
 return getParticipantRegistry('org.acme.mynetwork.IssuingBank')
        .then(function (ibRegistry) {
            // update the seller's balance
            return ibRegistry.update(nbcompli.ib);
        })
        .then(function () {
            return getParticipantRegistry('org.acme.mynetwork.Seller');
        })
        .then(function (sellerRegistry) {
            // update the importer's balance
            return sellerRegistry.update(nbcompli.seller);
        })

  .then(function () {
        return getAssetRegistry('org.acme.mynetwork.LOC');
 		})
        .then(function(ccnbtypeRegistry) {
            return ccnbtypeRegistry.update(nbcompli.loc);
        });
}

/**
 * Sample transaction processor function.
 *@param {org.acme.mynetwork.IBcompli} ibcompli - transaction instance for compliance check of exporter documents by issuing bank .
 *@transaction
 */
function ibcompli(ibcompli) {
   var loc = ibcompli.loc;
   var stat_iib = loc.iibtype;
   var stat_aab = loc.aabtype;
   var stat_edu = loc.edutype;
   var stat_ccnb = loc.ccnbtype;
   if ((stat_iib=="Done") && (stat_aab=="Done") && (stat_edu=="Done") && (stat_ccnb=="Done")){
   loc.ccibtype = 'Done';
   }
      return getAssetRegistry('org.acme.mynetwork.LOC')
        .then(function(ccibtypeRegistry) {
            return ccibtypeRegistry.update(ibcompli.loc);
        });
}

/**
 * Sample transaction processor function.
 *@param {org.acme.mynetwork.Buyerdocrec} buyerdocrec - transaction instance for receipt of document by the importer & fund transfer from importer.
 *@transaction
 */
function buyerdocrec(buyerdocrec) {
   var loc = buyerdocrec.loc;
   var stat_iib = loc.iibtype;
   var stat_aab = loc.aabtype;
   var stat_edu = loc.edutype;
   var stat_ccnb = loc.ccnbtype;
   var stat_ccib = loc.ccibtype;
   var buyer1 = buyerdocrec.buyer;
   var ib1=buyerdocrec.ib;
   if ((stat_iib=="Done") && (stat_aab=="Done") && (stat_edu=="Done") && (stat_ccnb=="Done") && (stat_ccib=="Done")){
   loc.dtbtype = 'Done';
   var amount=loc.amount;
   ib1.balance+=amount;
   buyer1.balance-=amount;
   }
  
  return getParticipantRegistry('org.acme.mynetwork.IssuingBank')
        .then(function (ibRegistry) {
            // update the ib's balance
            return ibRegistry.update(buyerdocrec.ib);
        })
        .then(function () {
            return getParticipantRegistry('org.acme.mynetwork.Buyer');
        })
        .then(function (buyerRegistry) {
            // update the Buyer's balance
            return buyerRegistry.update(buyerdocrec.buyer);
        })

  .then(function () {  
      return getAssetRegistry('org.acme.mynetwork.LOC')
        })
        .then(function(dritypeRegistry) {
            return dritypeRegistry.update(buyerdocrec.loc);
        });
}
