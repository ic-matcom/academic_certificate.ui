## 🎴 Template

### Overview
For the admin / staff app we are using a customized (by un2x3 dev team) [Creative-Tim](https://demos.creative-tim.com/vue-black-dashboard-pro/) template. We made
some customization and componente port, so we can use the 9% of the template with Vue 3

### Icons
Currently, we are using 3 source of icons.

1. Creative-Tim Now UI Icons package [showcase](https://demos.creative-tim.com/vue-black-dashboard-pro/#/components/icons). Usage sample
```html
<i class="tim-icons icon-simple-add"></i>
```

2. Fontawesome 5 icons. Usage samples:
```html
<i class="fa fa-caret-up sorter" :class="{ active: header.sorting === 'ASC' }"></i>
```

3. bootstrap-icons-vue npm package [repo](https://github.com/tommyip/bootstrap-icons-vue) | [org](https://icons.getbootstrap.com/). Usage sample
```html
<b-icon-calendar-4 />
```


