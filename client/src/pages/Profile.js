



// <section class="container mt-5">
//     <div class="columns">
//         <div class="column is-4">
//             <aside class="menu">
//                 <ul class="list">
//                     <li class="subtitle is-3">Welcome <strong>{user.name}</strong></li>
//                     <li class="box">
//                         {user.email}
//                     </li>
//                 </ul>
//             </aside>
//             <a class="button is-link is-block is-alt is-medium" href="/newevent">New Event</a>
//         </div>
//         <div class="column is-9">
//             <div class="box content">
               
//                 <h3 class="has-text-link">Events:</h3>



//                 {{#each user.events as |event|}}
//                 <article class="">
//                     <a href="/event/{{event.unique_id}}">
//                         <h4>{{event.title}}</h4>
//                     </a>
//                     <div class="media">
//                         <div class="media-content">
//                             <div class="content">
//                                 <p>
//                                     {{event.description}}
//                                 </p>
//                             </div>
//                         </div>
//                     </div>
//                 </article>
//                 {{/each}}
               
//             </div>
//         </div>
//     </div>
// </section>