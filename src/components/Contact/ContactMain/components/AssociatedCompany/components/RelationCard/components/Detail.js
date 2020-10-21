import React from 'react';
import { faPhoneAlt, faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RemoveBtn from '../../../../../../../RemoveBtn';
import './Detail.scss';


class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showRemoveModal: false
    }
    this.handleModalToggle = this.handleModalToggle.bind(this);
    this.onClickConfirmBtn = this.onClickConfirmBtn.bind(this);
    this.onClickCancelBtn = this.onClickCancelBtn.bind(this);
  }

  handleModalToggle() {
    this.setState(prevState => ({
      showRemoveModal: !prevState.showRemoveModal
    }))
  }

  onClickConfirmBtn() {
    this.props.handleRemoveCompany();
  }

  onClickCancelBtn() {
    this.handleModalToggle();
  }

  render() {
    const { website, name, phoneNumber, contact } = this.props;
    const { showRemoveModal } = this.state;
    const websiteURL = `https://${website}`;
    return (
      <div className="relatedCompany">
        <div className="relatedCompany__companyName"> {name} </div>
        <div className="relatedCompany__website">
          <a className="relatedCompany__website__link" href={websiteURL} target="_blank" rel="noopener noreferrer">
            {website}
          </a>
          <div className="relatedCompany__website__linkIcon">
            <FontAwesomeIcon icon={faExternalLinkAlt} />
          </div>
        </div>
        <div className="relatedCompany__phone">
          <div className="relatedCompany__phone__icon">
            <FontAwesomeIcon icon={faPhoneAlt} />
          </div>
          {phoneNumber}
        </div>
       
      </div >
    )
  };
}

export default Detail;
