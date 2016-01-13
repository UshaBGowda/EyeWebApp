<%@ Page Title="Contact" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Contact.aspx.cs" Inherits="EyeWebApp.Contact" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <h2><%: Title %>.</h2>
    <h3>University of Washington Bothell</h3>
    <address>
        18115 Campus Way Northeast<br />
        Bothell, WA 98011<br />
        <abbr title="Phone">P:</abbr>
        425.352.5000
    </address>

    <address>
        <strong>Support:</strong>   <a href="mailto:to.be@decided.com">to.be@decided.com</a><br />
        <strong>Marketing:</strong> <a href="mailto:Marketing@example.com">to.be@decided.com</a>
    </address>
</asp:Content>
