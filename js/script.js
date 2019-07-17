var app = angular.module("myApp", ["ngRoute", "ngAnimate"]);
app.config(function($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "index-1.html"
    })
    .when("/dashboard", {
      templateUrl: "dashboard.html"
    })
    .when("/transactions", {
      templateUrl: "transactions.html"
    })
    .when("/send", {
      templateUrl: "send-money.html"
    })
    .when("/request", {
      templateUrl: "request-money.html"
    })
    .when("/profile", {
      templateUrl: "profile.html"
    })
    .when("/card-account", {
      templateUrl: "profile-cards-and-bank-accounts.html"
    })
    .when("/notifications", {
      templateUrl: "profile-notifications.html"
    })
    // .when("/withdraw", {
    //   templateUrl: "withdraw.html"
    // })
    // .when("/deposit", {
    //   templateUrl: "deposit.html"
    // })
    // .when("/about", {
    //   templateUrl: "about-us.html"
    // })
    .when("/login", {
      name: "login",
      templateUrl: "login.html"
    })
    .when("/signup", {
      name: "signup",
      templateUrl: "signup.html"
    })

    .otherwise({ redirectTo: "/" });
});
app.config([
  "$locationProvider",
  function($locationProvider) {
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix("");
  }
]);

app.controller("myController", [
  "$scope",
  "$route",
  function($scope, $route) {
    if ($route.current) {
      return true;
    }

    $scope.isShowMenu = function() {
      if ($route.current == undefined || $route.current.$$route == undefined) {
        return false;
      }

      if (
        ($route.current != undefined &&
          $route.current.$$route["name"] == "signup") ||
        $route.current.$$route["name"] == "login"
      ) {
        return true;
      }
      return false;
    };

    $scope.isShowMenu = function() {
      // console.log($route);
    };
  }
]);

app.run(function($rootScope) {
  $rootScope.$on("$routeChangeStart", function(event, next, current) {
    $(".dropdown-menu")
      .stop()
      .css("display", "none");

    $('[data-loader="circle-side"]').fadeOut();
    $("#preloader-content")
      .show()
      .fadeOut("slow");

    setTimeout(() => {
      (function($) {
        "use strict";
        // Dropdown show on hover
        $(
          ".primary-menu ul.navbar-nav li.dropdown, .login-signup ul.navbar-nav li.dropdown"
        ).on("mouseover", function() {
          if ($(window).width() > 991) {
            $(this)
              .find("> .dropdown-menu")
              .stop()
              .slideDown("fast");
            $(this).bind("mouseleave", function() {
              $(this)
                .find("> .dropdown-menu")
                .stop()
                .css("display", "none");
            });
          }
        });

        // When dropdown going off to the out of the screen.
        $(".primary-menu .dropdown-menu").each(function() {
          var menu = $("#header .header-row").offset();
          var dropdown = $(this)
            .parent()
            .offset();

          var i =
            dropdown.left +
            $(this).outerWidth() -
            (menu.left + $("#header .header-row").outerWidth());

          if (i > 0) {
            $(this).css("margin-left", "-" + (i + 5) + "px");
          }
        });
        $(function() {
          $(".dropdown li").on("mouseenter mouseleave", function(e) {
            if ($(window).width() > 991) {
              var elm = $(".dropdown-menu", this);
              var off = elm.offset();
              var l;
              if (off) {
                l = off.left;
              }
              var w = elm.width();
              var docW = $(window).width();

              var isEntirelyVisible = l + w <= docW;
              if (!isEntirelyVisible) {
                $(elm).addClass("dropdown-menu-right");
              } else {
                $(elm).removeClass("dropdown-menu-right");
              }
            }
          });
        });

        // DropDown Arrow
        $(".primary-menu")
          .find("a.dropdown-toggle")
          .append($("<i />").addClass("arrow"));

        // Mobile Collapse Nav
        $(
          '.primary-menu .dropdown-toggle[href="#"], .primary-menu .dropdown-toggle[href!="#"] .arrow'
        ).on("click", function(e) {
          if ($(window).width() < 991) {
            e.preventDefault();
            var $parentli = $(this).closest("li");
            $parentli
              .siblings("li")
              .find(".dropdown-menu:visible")
              .slideUp();
            $parentli
              .find("> .dropdown-menu")
              .stop()
              .slideToggle();
            $parentli
              .siblings("li")
              .find("a .arrow.open")
              .toggleClass("open");
            $parentli.find("> a .arrow").toggleClass("open");
          }
        });

        // Mobile Menu Button Icon
        $(".navbar-toggler").on("click", function() {
          $(this).toggleClass("open");
        });

        /*---------------------------------------------------
   Carousel (Owl Carousel)
----------------------------------------------------- */

        setTimeout(() => {
          $(".owl-carousel").each(function(index) {
            var a = $(this);
            $(this).owlCarousel({
              autoplay: a.data("autoplay"),
              autoplayTimeout: a.data("autoplaytimeout"),
              autoplayHoverPause: a.data("autoplayhoverpause"),
              loop: a.data("loop"),
              speed: a.data("speed"),
              nav: a.data("nav"),
              dots: a.data("dots"),
              autoHeight: a.data("autoheight"),
              autoWidth: a.data("autowidth"),
              margin: a.data("margin"),
              stagePadding: a.data("stagepadding"),
              slideBy: a.data("slideby"),
              lazyLoad: a.data("lazyload"),
              navText: [
                '<i class="fa fa-chevron-left"></i>',
                '<i class="fa fa-chevron-right"></i>'
              ],
              animateOut: a.data("animateOut"),
              animateIn: a.data("animateIn"),
              video: a.data("video"),
              items: a.data("items"),
              responsive: {
                0: { items: a.data("items-xs") },
                576: { items: a.data("items-sm") },
                768: { items: a.data("items-md") },
                992: { items: a.data("items-lg") }
              }
            });
          });
        }, 100);

        /*---------------------------------------------------
    YouTube video to autoplay in modal
----------------------------------------------------- */
        // Gets the video src from the data-src on each button
        var $videoSrc;
        $(".video-btn").on("click", function() {
          $videoSrc = $(this).data("src");
        });
        // when the modal is opened autoplay it
        $("#videoModal").on("shown.bs.modal", function(e) {
          // set the video src to autoplay and not to show related video. Youtube related video is like a box of chocolates...you never know what you're gonna get
          $("#video").attr(
            "src",
            $videoSrc +
              "?autoplay=1&amp;modestbranding=1&amp;showinfo=0&amp;rel=0"
          );
        });
        // stop playing the youtube video when I close the modal
        $("#videoModal").on("hide.bs.modal", function(e) {
          $("#video").attr("src", $videoSrc);
        });

        /*---------------------------------------------------
   tooltips
----------------------------------------------------- */
        $("[data-toggle='tooltip']").tooltip({ container: "body" });

        /*---------------------------------------------------
   Scroll to top
----------------------------------------------------- */
        $(function() {
          $(window).on("scroll", function() {
            if ($(this).scrollTop() > 150) {
              $("#back-to-top").fadeIn();
            } else {
              $("#back-to-top").fadeOut();
            }
          });
        });
        $("#back-to-top").on("click", function() {
          $("html, body").animate({ scrollTop: 0 }, "slow");
          return false;
        });

        $(".smooth-scroll a").on("click", function() {
          var sectionTo = $(this).attr("href");
          $("html, body").animate(
            {
              scrollTop: $(sectionTo).offset().top - 50
            },
            600
          );
        });
      })(jQuery);
    }, 10);

    $(function() {
      var start = moment().subtract(29, "days");
      var end = moment();
      function cb(start, end) {
        $("#dateRange span").html(
          start.format("MMMM D, YYYY") + " - " + end.format("MMMM D, YYYY")
        );
      }
      $("#dateRange").daterangepicker(
        {
          startDate: start,
          endDate: end,
          ranges: {
            Today: [moment(), moment()],
            Yesterday: [
              moment().subtract(1, "days"),
              moment().subtract(1, "days")
            ],
            "Last 7 Days": [moment().subtract(6, "days"), moment()],
            "Last 30 Days": [moment().subtract(29, "days"), moment()],
            "This Month": [
              moment().startOf("month"),
              moment().endOf("month")
            ],
            "Last Month": [
              moment()
                .subtract(1, "month")
                .startOf("month"),
              moment()
                .subtract(1, "month")
                .endOf("month")
            ]
          }
        },
        cb
      );
      cb(start, end);
    });
  });

  $rootScope.$on("$routeChangeSuccess", function($event, next, current) {
    $("#preloader-content")
      .hide()
      .fadeOut("slow");
  });
});
