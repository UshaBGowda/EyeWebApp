<%@ Page Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="ParentHomePage.aspx.cs" Inherits="EyeWebApp.ParentHomePage" %>

<asp:Content runat="server" ID="BodyContent" ContentPlaceHolderID="MainContent">
    
    
    <script src="/Content/JQGridReq/grid.locale-en.js" language="javascript" type="text/javascript"></script>
    <script src="/Content/JQGridReq/jquery.jqGrid.js" language="javascript" type="text/javascript"></script>
    <script src="/Scripts/jquery-ui-1.11.4.js" language="javascript" type="text/javascript"></script>
     <script src="/Scripts/PageScripts/ParentHomePage.js" language="javascript" type="text/javascript"></script>
    <style type="text/css">
        .hiddencol {
            display: none;
        }
 
    </style>
    <div>

        <asp:Label ID="lblNoAccess" runat="server" Text="You are not authorized to access this page" Visible="false"></asp:Label>
    </div>

    <%--<div class="grid" style="overflow: auto; margin: 150px 50px 100px auto; height: 470px"
        id="dvMaster" runat="server">
          <asp:Button ID="btnCreate" OnClick="AddPatientProfile" runat="server" Text="Add Child Profile" />
        <asp:GridView ID="gvChildern" runat="server" CssClass="results" AutoGenerateColumns="false"
            HeaderStyle-CssClass="resultHeaderFooter"
            OnRowCommand="gvChildern_RowCommand" OnRowDataBound="gvChildern_RowDataBound" EmptyDataText="Currently there are no associated children">
            <Columns>
                <asp:TemplateField HeaderStyle-Wrap="true">
                    <HeaderTemplate>
                        Name
                    </HeaderTemplate>
                    <ItemTemplate>
                        <asp:LinkButton ID="name" EnableCallBack="true" runat="server" Text='<%# Eval("lastName")+", "+Eval("firstName") %> '
                            CommandArgument='<%# DataBinder.Eval(Container, "RowIndex") %>' />
                        <asp:Label ID="lblpatientId" runat="server" Text='<%# Eval("patientId") %> ' Visible="false"></asp:Label>
                        <asp:Label ID="lblparentId" runat="server" Text='<%# Eval("parentId") %> ' Visible="false"></asp:Label>
                        <asp:Label ID="lblproviderId" runat="server" Text='<%# Eval("providerId") %> ' Visible="false"></asp:Label>
                    </ItemTemplate>
                </asp:TemplateField>
                <asp:TemplateField HeaderStyle-Wrap="false">
                    <HeaderTemplate>
                        Date of Birth
                    </HeaderTemplate>
                    <ItemTemplate>
                        <asp:Label runat="server" ID="lbldob" Text='<%#Eval("dob")%>'></asp:Label>
                    </ItemTemplate>
                </asp:TemplateField>
                <asp:TemplateField HeaderStyle-Wrap="false">
                    <HeaderTemplate>
                        Gender
                    </HeaderTemplate>
                    <ItemStyle CssClass="Amt" />
                    <ItemTemplate>
                        <asp:Label runat="server" ID="lblGender" Text='<%#Eval("gender")%>'></asp:Label>
                    </ItemTemplate>
                </asp:TemplateField>
                <asp:TemplateField HeaderStyle-Wrap="false">
                    <HeaderTemplate>
                        Provider Name
                    </HeaderTemplate>
                    <ItemTemplate>
                        <asp:Label runat="server" ID="lblProviderName"></asp:Label>
                    </ItemTemplate>
                </asp:TemplateField>
            </Columns>
        </asp:GridView>   
    </div>

    <div id="dvDetails" class="grid" runat="server" visible="False">
        <asp:TextBox ID="txtFName" runat="server"></asp:TextBox>
        <asp:TextBox ID="txtLName" runat="server"></asp:TextBox>
        <asp:TextBox ID="txtDob" runat="server" />
        <asp:TextBox ID="txtGender" runat="server"></asp:TextBox>
        <asp:TextBox ID="txtProviderName" runat="server"></asp:TextBox>
        <asp:DropDownList ID="ddlGender" AppendDataBoundItems="true" runat="server" Visible="False">
            <asp:ListItem Text="Select" Value="0" />
            <asp:ListItem Text="Male" Value="M" />
            <asp:ListItem Text="Female" Value="F" />
        </asp:DropDownList>
        <asp:DropDownList ID="ddlProviderName" runat="server" Visible="False"></asp:DropDownList>


        <asp:Button ID="btnUpdate" OnClick="UpdateChildProfile" runat="server" Text="Edit Profile" />
        <asp:Button ID="btnCancel" OnClick="Cancel" runat="server" Text=" Cancel" Visible="True" />
        <asp:HiddenField runat="server" ID="hdnPatientId" />
        <asp:HiddenField runat="server" ID="hdnParentId" />
        <asp:HiddenField runat="server" ID="hdnProviderId" />--%>
   <div class="grid" id="dvMaster" style="overflow: auto; margin: 150px 50px 100px 50px;  height: 470px">
    <table id="jQChildren">
    </table>
    <div id="pgrChildren">
    </div></div>
</asp:Content>

