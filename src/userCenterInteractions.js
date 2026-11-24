export function initUserCenterCase(root) {
const abort=new AbortController(); const observers=[];
const listen=(target,type,handler,options={})=>target.addEventListener(type,handler,{...(typeof options==='boolean'?{capture:options}:options),signal:abort.signal});
const trackObserver=observer=>{observers.push(observer);return observer;};
const all = s => [...root.querySelectorAll(s)];
function pressed(selector, active) {
  all(selector).forEach(el => el.setAttribute('aria-pressed', String(el === active)));
}
all('[data-step]').forEach(button => listen(button, 'click', () => {
  pressed('[data-step]', button);
  ['role', 'sites'].forEach(step => root.querySelector('#' + step + '-panel').hidden = step !== button.dataset.step);
  root.querySelector('#uc-feedback').textContent = {
    role: 'Choose a role in the current staging environment.',
    sites: 'Site access is assigned separately from the role.',
    locations: 'Search and select locations. All values are fictional.'
  }[button.dataset.step];
}));
let savedRole = 'Ecommerce Manager';
listen(root.querySelector('#save-role'), 'click', () => {
  savedRole = root.querySelector('#role-select').value;
  root.querySelector('#current-role').textContent = savedRole;
  root.querySelector('#uc-feedback').textContent = 'Role saved in Staging: ' + savedRole + '.';
});
listen(root.querySelector('#cancel-role'), 'click', () => {
  root.querySelector('#role-select').value = savedRole;
  root.querySelector('#uc-feedback').textContent = 'The saved role selection was restored.';
});
let savedSites = ['Example Store US'];
const siteSelect = root.querySelector('#site-select');
const siteOptions = root.querySelector('#site-options');
function updateSiteSelection() {
  const chosen = all('#site-options input:checked').map(input => input.value);
  root.querySelector('#site-select-value').textContent = chosen.length === 1 ? chosen[0] : chosen.length ? chosen.length + ' sites selected' : 'Select all that apply...';
}
function closeSiteSelection(focus = false) {
  siteOptions.hidden = true;
  siteSelect.setAttribute('aria-expanded', 'false');
  if (focus) siteSelect.focus({
    preventScroll: true
  });
}
listen(siteSelect, 'click', event => {
  const open = siteOptions.hidden;
  siteOptions.hidden = !open;
  siteSelect.setAttribute('aria-expanded', String(open));
  if (open && event.isTrusted) siteOptions.querySelector('input').focus({
    preventScroll: true
  });
});
all('#site-options input').forEach(input => listen(input, 'change', updateSiteSelection));
listen(siteOptions, 'keydown', event => {
  if (event.key === 'Escape') {
    event.preventDefault();
    closeSiteSelection(true);
  }
});
listen(document, 'pointerdown', event => {
  if (!siteSelect.parentElement.contains(event.target) && !event.target.closest('#profile-film .film-controls')) closeSiteSelection();
});
updateSiteSelection();
listen(root.querySelector('#save-sites'), 'click', () => {
  savedSites = all('#site-options input:checked').map(el => el.value);
  root.querySelector('#current-site').textContent = savedSites.length ? savedSites.join(', ') : 'None assigned';
  updateSiteSelection();
  closeSiteSelection();
  root.querySelector('#uc-feedback').textContent = 'Site assignments saved.';
});
listen(root.querySelector('#cancel-sites'), 'click', () => {
  all('#site-options input').forEach(el => el.checked = savedSites.includes(el.value));
  updateSiteSelection();
  closeSiteSelection();
  root.querySelector('#uc-feedback').textContent = 'The saved site selections were restored.';
});
const locations = [{
  name: 'North location',
  site: 'Example Store US',
  type: 'Store',
  code: '100101'
}, {
  name: 'South location',
  site: 'Example Store US',
  type: 'Store',
  code: '100102'
}, {
  name: 'Central location',
  site: 'Example Store Canada',
  type: 'Store',
  code: '200101'
}, {
  name: 'East location',
  site: 'Example Store Europe',
  type: 'Store',
  code: '300101'
}];
const selected = new Set(['100101']);
function visibleLocations() {
  const query = root.querySelector('#location-search').value.trim().toLowerCase();
  const column = root.querySelector('#location-column').value;
  return locations.filter(row => (column === 'all' ? Object.values(row).join(' ') : row[column]).toLowerCase().includes(query));
}
function updateLocations() {
  const rows = visibleLocations();
  root.querySelector('#location-rows').replaceChildren(...rows.map(row => {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.checked = selected.has(row.code);
    input.setAttribute('aria-label', 'Assign ' + row.name);
    listen(input, 'change', () => {
      input.checked ? selected.add(row.code) : selected.delete(row.code);
      updateLocations();
    });
    td.append(input);
    tr.append(td);
    ['name', 'site', 'type', 'code'].forEach(key => {
      const cell = document.createElement('td');
      cell.textContent = row[key];
      tr.append(cell);
    });
    return tr;
  }));
  const checked = rows.filter(row => selected.has(row.code)).length;
  const allInput = root.querySelector('#all-locations');
  allInput.checked = !!rows.length && checked === rows.length;
  allInput.indeterminate = checked > 0 && checked < rows.length;
  allInput.disabled = !rows.length;
  root.querySelector('#location-count').textContent = selected.size + (selected.size === 1 ? ' location selected' : ' locations selected');
}
listen(root.querySelector('#location-search'), 'input', updateLocations);
listen(root.querySelector('#location-column'), 'change', updateLocations);
listen(root.querySelector('#all-locations'), 'change', event => {
  visibleLocations().forEach(row => event.target.checked ? selected.add(row.code) : selected.delete(row.code));
  updateLocations();
});
updateLocations();
// Native scrolling, with a restrained entrance for each copy/visual pair.
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  root.classList.add('motion-ready');
  const observer = trackObserver(new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px 0px 8% 0px',
    threshold: 0
  }));
  all('.chapter').forEach(chapter => observer.observe(chapter));
}
const $ = selector => root.querySelector(selector);
const $$ = selector => [...root.querySelectorAll(selector)];
const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
const reduced = () => motionPreference.matches || new URLSearchParams(location.search).get('motion') === 'reduce';
const controllers = [];

// The role editor implements the two dependency rules verified in DCP-7068.
const roleFilm = $('#role-edit-film');
const inputs = [...roleFilm.querySelectorAll('[data-permission]')];
const center = $('#permission-center');
const state = () => [center.checked, ...inputs.map(input => input.checked)];
let savedPermissions = state();
const dirty = () => state().some((value, i) => value !== savedPermissions[i]);
function updateDirty() {
  $('#role-discard').disabled = $('#role-save').disabled = !dirty();
  $('#role-dirty-status').textContent = dirty() ? 'Unsaved changes' : 'No unsaved changes';
}
function closeModal(focus = false) {
  roleFilm.querySelector('.role-modal-scrim').hidden = true;
  roleFilm.querySelector('.role-edit-product').inert = false;
  if (focus) (dirty() ? $('#role-discard') : $('#proof-view')).focus({
    preventScroll: true
  });
}
function resetPermissions() {
  center.checked = true;
  inputs.forEach(input => {
    input.checked = true;
    input.disabled = false;
  });
  savedPermissions = state();
  closeModal();
  updateDirty();
  $('#permission-feedback').textContent = 'Edit access requires View access.';
  $('#role-film-step').textContent = 'Explore role editing';
}
inputs.forEach(input => listen(input, 'change', () => {
  const partner = roleFilm.querySelector(`[data-permission="${input.dataset.permission}"][data-action="${input.dataset.action === 'view' ? 'edit' : 'view'}"]`);
  if (input.dataset.action === 'view' && !input.checked) {
    partner.checked = false;
    $('#permission-feedback').textContent = 'View removed. Edit is removed with it.';
  } else if (input.dataset.action === 'edit' && input.checked) {
    partner.checked = true;
    $('#permission-feedback').textContent = 'Edit access includes the View access it requires.';
  } else if (input.dataset.action === 'edit') {
    $('#permission-feedback').textContent = 'Edit removed. View access stays selected.';
  } else {
    $('#permission-feedback').textContent = 'View access selected. Edit is a separate choice.';
  }
  updateDirty();
}));
listen(center, 'change', () => {
  inputs.forEach(input => {
    input.disabled = !center.checked;
  });
  $('#permission-feedback').textContent = center.checked ? 'User Center enabled for this example.' : 'User Center disabled for this example.';
  updateDirty();
});
listen($('#role-save'), 'click', () => {
  savedPermissions = state();
  updateDirty();
  $('#permission-feedback').textContent = 'Role permissions saved.';
});
listen($('#role-discard'), 'click', event => {
  if (!dirty()) return;
  roleFilm.querySelector('.role-modal-scrim').hidden = false;
  roleFilm.querySelector('.role-edit-product').inert = true;
  if (event.isTrusted) $('#keep-editing').focus({
    preventScroll: true
  });
});
listen($('#keep-editing'), 'click', event => closeModal(event.isTrusted));
listen($('#close-role-modal'), 'click', event => closeModal(event.isTrusted));
listen($('#leave-without-saving'), 'click', event => {
  center.checked = savedPermissions[0];
  inputs.forEach((input, i) => {
    input.checked = savedPermissions[i + 1];
    input.disabled = !center.checked;
  });
  updateDirty();
  closeModal(event.isTrusted);
  $('#permission-feedback').textContent = 'Unsaved changes discarded. The saved permissions are restored.';
});
listen(roleFilm.querySelector('.role-modal'), 'keydown', event => {
  if (event.key === 'Escape') {
    event.preventDefault();
    closeModal(true);
  }
  if (event.key === 'Tab') {
    const buttons = [...roleFilm.querySelectorAll('.role-modal button')];
    const current = buttons.indexOf(document.activeElement);
    event.preventDefault();
    buttons[(current + (event.shiftKey ? -1 : 1) + buttons.length) % buttons.length].focus();
  }
});
class CursorFilm {
  constructor(root, {
    name,
    reset,
    cues,
    duration
  }) {
    this.root = root;
    this.stage = root.querySelector('.film-stage');
    this.cursor = root.querySelector('.film-cursor');
    this.ring = root.querySelector('.film-click');
    this.play = root.querySelector('.film-play');
    this.replay = root.querySelector('.film-replay');
    this.name = name;
    this.reset = reset;
    this.cues = cues;
    this.duration = duration;
    this.elapsed = 0;
    this.frame = 0;
    this.index = 0;
    this.mode = 'idle';
    this.activeMove = null;
    this.position = {
      x: 10,
      y: 10
    };
    this.autoplayed = false;
    this.visible = false;
    listen(this.play, 'click', () => {
      this.autoplayed = true;
      if (this.mode === 'playing') this.pause('user');else {
        this.bringIntoView();
        this.start(this.mode !== 'paused');
      }
    });
    listen(this.replay, 'click', () => {
      this.autoplayed = true;
      if (reduced()) {
        this.reset();
        this.elapsed = 0;
        this.mode = 'idle';
        this.update();
      } else {
        this.bringIntoView();
        this.start(true);
      }
    });
    ['pointerdown', 'keydown', 'input', 'change'].forEach(type => listen(this.stage, type, event => {
      if (event.isTrusted && !this.performing) this.takeOver();
    }, {
      capture: true
    }));
    trackObserver(new ResizeObserver(() => {
      if (this.mode === 'playing') {
        this.pause('resize');
        if (this.visible) this.start(false);
      }
    })).observe(this.stage);
    this.update();
    controllers.push(this);
  }
  update() {
    this.root.dataset.playback = this.mode;
    this.play.setAttribute('aria-label', `${this.mode === 'playing' ? 'Pause' : this.mode === 'paused' ? 'Resume' : 'Play'} ${this.name} demonstration`);
    this.play.classList.toggle('is-playing', this.mode === 'playing');
    this.play.classList.toggle('is-complete', this.mode === 'complete');
    this.play.hidden = reduced();
    this.replay.disabled = false;
    this.play.title = reduced() ? 'Animation disabled by reduced-motion preference. The controls remain interactive.' : this.play.getAttribute('aria-label');
    this.play.style.setProperty('--progress', `${Math.min(100, this.elapsed / this.duration * 100)}%`);
  }
  bringIntoView() {
    const bounds = this.root.getBoundingClientRect();
    if (bounds.top < 0 || bounds.bottom > innerHeight) this.root.scrollIntoView({
      block: 'center',
      behavior: 'instant'
    });
  }
  point(selector) {
    const element = typeof selector === 'function' ? selector() : this.root.querySelector(selector);
    if (!element || element.hidden) return this.position;
    const stage = this.stage.getBoundingClientRect(),
      target = element.getBoundingClientRect();
    const sx = this.stage.offsetWidth / (stage.width || 1),
      sy = this.stage.offsetHeight / (stage.height || 1);
    return {
      x: Math.max(2, Math.min(this.stage.offsetWidth - 18, (target.left - stage.left + target.width * .55) * sx)),
      y: Math.max(2, Math.min(this.stage.offsetHeight - 22, (target.top - stage.top + target.height * .5) * sy))
    };
  }
  paint(point) {
    this.position = point;
    this.cursor.style.transform = `translate(${point.x}px,${point.y}px)`;
  }
  tap() {
    this.ring.style.left = `${this.position.x + 3}px`;
    this.ring.style.top = `${this.position.y + 3}px`;
    this.ring.getAnimations().forEach(animation => animation.cancel());
    this.ring.animate([{
      opacity: .65,
      transform: 'scale(.3)'
    }, {
      opacity: 0,
      transform: 'scale(1.8)'
    }], {
      duration: 430,
      easing: 'ease-out'
    });
  }
  start(restart) {
    if (reduced()) return;
    cancelAnimationFrame(this.frame);
    controllers.forEach(film => {
      if (film !== this && film.mode === 'playing') film.pause('another');
    });
    if (restart) {
      this.elapsed = 0;
      this.index = 0;
      this.activeMove = null;
      this.reset();
      this.paint({
        x: this.stage.offsetWidth * .78,
        y: Math.min(140, this.stage.offsetHeight * .3)
      });
    }
    this.mode = 'playing';
    this.pauseReason = null;
    this.cursor.style.opacity = '1';
    this.started = performance.now() - this.elapsed * 1000;
    this.update();
    this.frame = requestAnimationFrame(now => this.tick(now));
  }
  tick(now) {
    if (this.mode !== 'playing') return;
    this.elapsed = Math.min(this.duration, (now - this.started) / 1000);
    while (this.index < this.cues.length && this.cues[this.index].at <= this.elapsed) {
      const cue = this.cues[this.index++];
      if (cue.target) this.activeMove = {
        from: {
          ...this.position
        },
        target: cue.target,
        start: cue.at,
        duration: cue.duration || .8
      };
      if (cue.tap) this.tap();
      if (cue.action) {
        this.performing = true;
        try {
          cue.action();
        } finally {
          this.performing = false;
        }
      }
    }
    if (this.activeMove) {
      const move = this.activeMove,
        t = Math.min(1, Math.max(0, (this.elapsed - move.start) / move.duration));
      const eased = t * t * (3 - 2 * t),
        end = this.point(move.target);
      this.paint({
        x: move.from.x + (end.x - move.from.x) * eased,
        y: move.from.y + (end.y - move.from.y) * eased
      });
    }
    this.update();
    if (this.elapsed >= this.duration) {
      this.mode = 'complete';
      this.cursor.style.opacity = '0';
      this.update();
      return;
    }
    this.frame = requestAnimationFrame(time => this.tick(time));
  }
  pause(reason) {
    if (this.mode !== 'playing') return;
    cancelAnimationFrame(this.frame);
    this.mode = 'paused';
    this.pauseReason = reason;
    this.ring.getAnimations().forEach(animation => animation.pause());
    this.update();
  }
  takeOver() {
    if (this.mode === 'manual') return;
    cancelAnimationFrame(this.frame);
    this.autoplayed = true;
    this.mode = 'manual';
    this.activeMove = null;
    this.cursor.style.opacity = '0';
    this.ring.getAnimations().forEach(animation => animation.cancel());
    this.root.querySelectorAll('.film-menu').forEach(menu => menu.hidden = true);
    if (this.root.id === 'role-edit-film') $('#role-film-step').textContent = 'Explore role editing';
    this.update();
  }
}
const profile = $('#profile-film');
const menu = profile.querySelector('.film-menu');
const selectRole = value => {
  $('#role-select').value = value;
};
function resetProfile() {
  closeProfileMenu();
  profile.querySelector('[data-step="role"]').click();
  selectRole('Ecommerce Manager');
  $('#save-role').click();
  $$('#site-options input').forEach(input => input.checked = input.value === 'Example Store US');
  $('#save-sites').click();
  $('#uc-feedback').textContent = 'Choose a role in the current staging environment.';
}
function closeProfileMenu() {
  menu.hidden = true;
}
const assignment = new CursorFilm(profile, {
  name: 'profile',
  duration: 13.2,
  reset: resetProfile,
  cues: [{
    at: .2,
    target: '#role-select'
  }, {
    at: 1.2,
    tap: true,
    action: () => {
      const outer = profile.querySelector('.film-stage').getBoundingClientRect(),
        rect = $('#role-select').getBoundingClientRect();
      menu.style.left = `${rect.left - outer.left}px`;
      menu.style.top = `${rect.bottom - outer.top + 3}px`;
      menu.style.width = `${rect.width}px`;
      menu.hidden = false;
    }
  }, {
    at: 1.55,
    target: '[data-demo-role="Customer Service Representative"]',
    duration: .7
  }, {
    at: 2.4,
    tap: true,
    action: () => {
      selectRole('Customer Service Representative');
      closeProfileMenu();
    }
  }, {
    at: 2.9,
    target: '#save-role'
  }, {
    at: 3.8,
    tap: true,
    action: () => $('#save-role').click()
  }, {
    at: 4.3,
    target: '[data-step="sites"]'
  }, {
    at: 5.2,
    tap: true,
    action: () => profile.querySelector('[data-step="sites"]').click()
  }, {
    at: 5.65,
    target: '#site-select'
  }, {
    at: 6.5,
    tap: true,
    action: () => $('#site-select').click()
  }, {
    at: 7.1,
    target: '#site-options input[value="Example Store Canada"]'
  }, {
    at: 8,
    tap: true,
    action: () => $('#site-options input[value="Example Store Canada"]').click()
  }, {
    at: 8.4,
    target: '#site-select',
    duration: .4
  }, {
    at: 8.95,
    tap: true,
    action: () => $('#site-select').click()
  }, {
    at: 9.25,
    target: '#save-sites'
  }, {
    at: 10.15,
    tap: true,
    action: () => $('#save-sites').click()
  }, {
    at: 10.65,
    target: '#current-site',
    duration: 1
  }, {
    at: 12,
    action: () => {
      $('#uc-feedback').textContent = 'Role and site assignments saved.';
    }
  }]
});
listen(document, 'pointerdown', event => {
  if (event.isTrusted && !$('#site-options').hidden && !event.target.closest('.site-multiselect') && !event.target.closest('#profile-film .film-controls')) assignment.takeOver();
}, {
  capture: true
});
new CursorFilm(roleFilm, {
  name: 'role editing',
  duration: 18,
  reset: resetPermissions,
  cues: [{
    at: .2,
    target: '#proof-view'
  }, {
    at: 1.2,
    tap: true,
    action: () => {
      $('#proof-view').click();
      $('#role-film-step').textContent = 'Removing View also removes Edit';
    }
  }, {
    at: 3,
    tap: true,
    action: () => $('#proof-view').click()
  }, {
    at: 3.5,
    target: '#proof-edit'
  }, {
    at: 4.5,
    tap: true,
    action: () => $('#proof-edit').click()
  }, {
    at: 6,
    tap: true,
    action: () => {
      $('#proof-edit').click();
      $('#role-film-step').textContent = 'Removing Edit preserves View';
    }
  }, {
    at: 7.3,
    target: '#role-discard'
  }, {
    at: 8.3,
    tap: true,
    action: () => {
      $('#role-discard').click();
      $('#role-film-step').textContent = 'Unsaved changes require a decision';
    }
  }, {
    at: 9,
    target: '#keep-editing'
  }, {
    at: 10,
    tap: true,
    action: () => $('#keep-editing').click()
  }, {
    at: 11,
    target: '#role-discard'
  }, {
    at: 12,
    tap: true,
    action: () => $('#role-discard').click()
  }, {
    at: 12.8,
    target: '#leave-without-saving'
  }, {
    at: 13.8,
    tap: true,
    action: () => $('#leave-without-saving').click()
  }, {
    at: 14.5,
    target: '#proof-edit'
  }, {
    at: 16,
    action: () => {
      $('#role-film-step').textContent = 'Saved permissions restored';
    }
  }]
});
const observer = trackObserver(new IntersectionObserver(entries => entries.forEach(entry => {
  const film = controllers.find(film => film.root === entry.target);
  film.visible = entry.isIntersecting && entry.intersectionRatio >= .3;
  if (!film.visible) film.pause('offscreen');else if (!document.hidden && !reduced()) {
    if (!film.autoplayed && entry.intersectionRatio >= .65) {
      film.autoplayed = true;
      film.start(true);
    } else if (film.mode === 'paused' && ['offscreen', 'hidden'].includes(film.pauseReason)) film.start(false);
  }
}), {
  threshold: [0, .3, .65]
}));
controllers.forEach(film => observer.observe(film.root));
listen(document, 'visibilitychange', () => controllers.forEach(film => {
  if (document.hidden) film.pause('hidden');else if (film.visible && film.mode === 'paused' && film.pauseReason === 'hidden') film.start(false);
}));
function motionChanged() {
  root.classList.toggle('motion-reduced', reduced());
  controllers.forEach(film => {
    if (reduced()) film.takeOver();
    film.update();
  });
}
listen(motionPreference, 'change', motionChanged);
motionChanged();
return ()=>{abort.abort();observers.forEach(observer=>observer.disconnect());controllers.forEach(film=>{cancelAnimationFrame(film.frame);film.ring.getAnimations().forEach(animation=>animation.cancel());});};
}
