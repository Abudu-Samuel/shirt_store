import React from 'react';

export default ({ address, city, postalCode, country, handleChange, shipping_region_id, setRegion, state }) => (
  <div>
    <div>
      <div className="row">
        <div className="col-md-6 mb-3">
          <div className="md-form">
            <i style={{ fontSize: '1.6rem' }} className="fa fa-address-card prefix grey-text" />
            <label className="font-weight-light label">Your adress</label>
            <input type="text" name="address" id="materialFormCardNameEx" value={address || ''} onChange={handleChange} className={state.validation && state.validation.address ? 'error-input-field' : "initial"} />
            {state.validation && (
              <span className="field-error d-flex justify-content-end">
                {state.validation.address}
              </span>
            )}
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="md-form">
            <i style={{ fontSize: '1.6rem' }} className="fa fa-city prefix grey-text" />
            <input type="text" name="city" id="materialFormCardEmailEx" onChange={handleChange} value={city || ''} className={state.validation && state.validation.city ? 'error-input-field' : "initial"} />
            {state.validation && (
              <span className="field-error d-flex justify-content-end">
                {state.validation.city}
              </span>
            )}
            <label className="font-weight-light label">Your city</label>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="md-form">
            <i style={{ fontSize: '1.6rem' }} className="fa fa-mail-bulk prefix grey-text" />
            <input type="email" name="postalCode" id="materialFormCardEmailEx" value={postalCode || ''} onChange={handleChange} className={state.validation && state.validation.postalCode ? 'error-input-field' : "initial"} />
            {state.validation && (
              <span className="field-error d-flex justify-content-end">
                {state.validation.postalCode}
              </span>
            )}
            <label className="font-weight-light label">Your postal code</label>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="md-form">
            <i style={{ fontSize: '1.6rem' }} className="fa fa-globe-europe prefix grey-text" />
            <input type="email" name="country" id="materialFormCardEmailEx" value={country || ''} onChange={handleChange} className={state.validation && state.validation.country ? 'error-input-field' : "initial"} />
            {state.validation && (
              <span className="field-error d-flex justify-content-end">
                {state.validation.country}
              </span>
            )}
            <label className="font-weight-light label">Your country</label>
          </div>
        </div>
        <div className="col-md-12 mb-3">
          <div className="md-form">
            <i style={{ fontSize: '1.6rem' }} className="fa fa-address-card prefix grey-text" />
            <label className="font-weight-light label">Your region</label>
            <select name="shippingRegion" value={shipping_region_id} onChange={setRegion} className={state.validation && state.validation.shipping_region_id ? 'error-input-field browser-default custom-select' : "initial browser-default custom-select"}>
              <option value="1" defaultValue>Open this select menu</option>
              <option value="2">US / Canada</option>
              <option value="3">Europe</option>
              <option value="4">Rest of World</option>
            </select>
            {state.validation && (
              <span className="field-error d-flex justify-content-end">
                {state.validation.shipping_region_id}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
)