import React from 'react';
import Detail from './components/Detail';
import './RelationCard.scss'



const RelationCard = ({
  company,
  handleRemoveCompany
}) => {
  return (
    <div className="relationcard">
      {company ?
        <Detail
          name={company.name}
          handleRemoveCompany = {handleRemoveCompany}
          website={company.companyDomain}
          phoneNumber={company.phoneNumber} />
        :
        <div className = "relationcard__description">
          View the company related to this contact. Add an existing company or create a new one.
        </div>
      }

    </div>
  )
}



export default RelationCard;