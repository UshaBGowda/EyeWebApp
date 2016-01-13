<%@ Page Title="Home Page" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="EyeWebApp._Default" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">

    <div class="">
        <%--<h1>ASP.NET</h1>
        <p class="lead">ASP.NET is a free web framework for building great Web sites and Web applications using HTML, CSS, and JavaScript.</p>
        <p><a href="http://www.asp.net" class="btn btn-primary btn-lg">Learn more &raquo;</a></p>--%>
        <div id="slider">
            <figure>
            <img src="/Content/Images/Slide1.jpg" alt="">
            <img src="/Content/Images/Slide2.jpg" alt="">
                 <img src="/Content/Images/Slide1.jpg" alt="">
            <img src="/Content/Images/Slide2.jpg" alt="">
                 <img src="/Content/Images/Slide1.jpg" alt="">
            </figure>
        </div>
    </div>

    <div class="row">
        <div class="col-md-4">
            <h2>Why is it Important?</h2>
            <p>
                American optometric association says that nearly 25% of school age children
in USA have some kind of vision problems.
            </p>
            <p>
                <a class="btn btn-default" href="https://en.wikipedia.org/wiki/Pediatric_ophthalmology">Learn more &raquo;</a>
            </p>
        </div>
        <div class="col-md-4">
            <h2>What we do / Services</h2>
            <p>
                Develop software to address unmet need for vision screening and therapy
for children.Provide vision therapy games/exercises. Provide ability for Parents and Providers to see improvement in children vision.
            </p>
        <%--    <p>
                <a class="btn btn-default" href="http://go.microsoft.com/fwlink/?LinkId=301949">Learn more &raquo;</a>
            </p>--%>
        </div>
        <div class="col-md-4">
            <h2>Annual Vision and Learning Symposium</h2>
            <p>
                The Second Annual Vision and Learning Symposium will delve into many critical issues facing children with vision problems,both educational and political, including assessment, educational approaches, new technologies for vision games and therapies, and underlying issues of social justice.
            </p>
            <p>
                <a class="btn btn-default" href="https://www.eventbrite.com/e/educating-young-eyes-conference-2016-feb-26-27-tickets-20538673726">Learn more &raquo;</a>
            </p>
        </div>
    </div>

</asp:Content>
