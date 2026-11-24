import './userCenterPreview.css';

// A static excerpt of the reviewed profile design, shared by Home, Work, and inspection.
export function UserCenterPreview(){
 return <figure className="b-story-figure b-user-center-visual" aria-label="User Center profile design with fictional role, site, and location assignments">
  <div className="b-user-center-screen">
   <header><div><span>User profile</span><strong>Alex Morgan</strong></div><span className="uc-preview-environment">Staging</span></header>
   <section><h4>Assigned User Roles</h4><div><span className="uc-preview-label">Current environment</span><span className="uc-preview-environment">Staging</span><span className="uc-preview-label">User Role</span><div className="uc-preview-select">Ecommerce Manager<img src="/assets/user-center/chevrons-up-down.svg" alt="" width="16" height="16"/></div></div></section>
   <section className="uc-preview-assignments"><h4>Sites &amp; locations</h4><div><span><small>Site</small>Example Store US</span><span><small>Location</small>North location</span></div></section>
  </div>
 </figure>;
}
