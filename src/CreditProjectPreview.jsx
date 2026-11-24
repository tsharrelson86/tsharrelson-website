import {CheckCircle} from '@phosphor-icons/react';
import './creditProjectPreview.css';

// A small, static excerpt of the approved credit-tool interface. Both index
// pages and the mobile inspection viewer render this same fictional example.
export function CreditProjectPreview(){
  return <figure className="b-story-figure b-credit-visual" aria-label="Customer-credit design excerpt with fictional sample values: 20 percent of a selected item price and tax produces a $9.89 credit.">
    <div className="b-credit-screen">
      <header className="b-credit-header"><h4>Advanced Credit Tool</h4><span>Visa ••4456</span></header>
      <div className="b-credit-percentage">Apply % to selected items: <span>20<span>%</span></span></div>
      <div className="b-credit-table">
        <div className="b-credit-head"><span>Item</span><span>Available<br/>Item Price</span><span>Available<br/>Item Tax</span></div>
        <div className="b-credit-row">
          <div className="b-credit-product"><img src="/assets/credit-tool/generic-shoe-thumb.png" alt="" width="40" height="40" loading="lazy"/><span>Knit running shoe<small>SKU1333</small></span></div>
          <span className="b-credit-selected"><CheckCircle aria-hidden="true"/><span>$44.98</span></span>
          <span className="b-credit-selected"><CheckCircle aria-hidden="true"/><span>$4.49</span></span>
        </div>
      </div>
      <footer className="b-credit-result"><span>Total Credit Amount:</span><strong>$9.89</strong></footer>
    </div>
  </figure>;
}
