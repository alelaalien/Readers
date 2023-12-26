@extends('layouts.app') 
 
@section('content')  
<link href="{{asset('css/profile.css')}}" rel="stylesheet">  
<link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>  

@php $pic = $user->profile_photo_path ?  $user->profile_photo_path : 'back.png'; @endphp
<div class="mobile-nav-toggle d-lg-none d-md-flex">
    <i class="bx bx-menu"></i>
</div> 
  <div  id="profiles">
    <div class="d-flex">
        <div class="fixed-column " id="side-col" style="padding: 0px!important;">
            <header id="header">
                <div class="d-flex flex-column">
                    <x-profiles.social-media :user="$user" :media="$socialMediaPaint" :detail="$detail"/>
                    <x-profiles.nav :user="$user"/>     
                </div>
            </header>
        </div>
        <div class="" style="overflow-y: scroll;padding: 0px!important;width:100%;">
            <section id="hero" class="d-flex flex-column justify-content-center align-items-center" style="background-image: url('{{ asset('img/users/'.$pic)}}');    background-size: cover; height: 100vh;">
                <div class="hero-container" data-aos="fade-in">
                <h1 class="editable">{{$user->name}}</h1>
                <p>I'm <span class="typed" data-typed-items="Designer, Developer, Freelancer, Photographer"></span></p>
                </div> 
                @if($isProfileOwner)
                    @livewire('editing-button')
                @endif 
            </section>
            <main id="main"> 
                <x-profiles.about-me :user="$user" />
                <x-profiles.posted-books :user="$user" />
                <x-profiles.orders :user="$user" />
                <x-profiles.reviews :user="$user" />
                <x-profiles.poems :user="$user" />
                <x-profiles.thoughts :user="$user" />
                <x-profiles.podcasts :user="$user" />
                
                
            </main>
        </div>
    </div>  
  </div>

<div class="btn_up-to">
  <i class="bx bx-chevrons-up"></i>
</div>
 
  <a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>

  <!-- Vendor JS Files -->
  <script src="https://cdn.jsdelivr.net/npm/@srexi/purecounterjs/dist/purecounter_vanilla.js"></script>
 

  <!-- Template Main JS File -->
  <script src="{{asset('js/profile.js')}}"></script>
 @endsection