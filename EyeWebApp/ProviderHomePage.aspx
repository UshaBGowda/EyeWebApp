<%@ Page Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="ProviderHomePage.aspx.cs" Inherits="EyeWebApp.ProviderHomePage" %>

<asp:Content runat="server" ID="BodyContent" ContentPlaceHolderID="MainContent">
        <script src="/Content/JQGridReq/grid.locale-en.js" language="javascript" type="text/javascript"></script>
    <script src="/Content/JQGridReq/jquery.jqGrid.js" language="javascript" type="text/javascript"></script>
    <script src="/Scripts/jquery-ui-1.11.4.js" language="javascript" type="text/javascript"></script>
     <script src="/Scripts/PageScripts/ProviderHomePage.js" language="javascript" type="text/javascript"></script>

    <style type="text/css">
  .hiddencol
  {
    display: none;
  }
</style>
     <div>

        <asp:Label ID="lblNoAccessProvider" runat="server" Text="You are not authorized to access this page" Visible="false"></asp:Label>
        </div>
       <div class="grid" id="dvMaster" style="overflow: auto; margin: 150px 50px 100px auto;  height: 470px">
    <table id="jQPatients">
    </table>
     
    <div id="pgrPatients">
    </div></div>
</asp:content>

