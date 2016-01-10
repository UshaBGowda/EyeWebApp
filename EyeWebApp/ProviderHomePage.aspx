<%@ Page Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="ProviderHomePage.aspx.cs" Inherits="EyeWebApp.ProviderHomePage" %>

<asp:Content runat="server" ID="BodyContent" ContentPlaceHolderID="MainContent">
    <style type="text/css">
  .hiddencol
  {
    display: none;
  }
</style>
     <div>

        <asp:Label ID="lblNoAccessProvider" runat="server" Text="You are not authorized to access this page" Visible="false"></asp:Label>
        </div>
 
     <div class="grid" style="overflow:auto; margin: 150px 50px 100px auto;
                    height: 470px" id="dvMaster" runat="server">
                   
                    <asp:GridView ID="gvPatients" runat="server" CssClass="results" AutoGenerateColumns="false"
                        HeaderStyle-CssClass="resultHeaderFooter" 
                        OnRowCommand="gvPatients_RowCommand" OnRowDataBound="gvPatients_RowDataBound" EmptyDataText="Currently there are no associated patients">
                        <Columns>
                            <asp:TemplateField HeaderStyle-Wrap="true">
                                <HeaderTemplate>
                                    Name
                                </HeaderTemplate>
                                <ItemTemplate > 
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
                                <ItemStyle CssClass="Amt"/>
                                <ItemTemplate>
                                    <asp:Label runat="server" ID="lblGender" Text='<%#Eval("gender")%>'></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateField>
                                <asp:TemplateField HeaderStyle-Wrap="false">
                                <HeaderTemplate>
                                    Parent Name
                                </HeaderTemplate>
                                <ItemTemplate>
                                    <asp:Label runat="server" ID="lblParentName"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateField>
                        </Columns>
                    </asp:GridView>
                    </div>

    <div id="dvDetails" class="grid" runat="server" Visible="False">
        <div id="newDiv">
              <asp:Button ID="btnGoBack" OnClick="GoBack" runat="server" Text=" Go back" Visible="True"/>
        </div>
        <asp:TextBox ID="txtFName" runat="server"></asp:TextBox>
        <asp:TextBox ID="txtLName" runat="server"></asp:TextBox>
        <asp:TextBox ID="txtDob" runat="server"/>
        <asp:TextBox ID="txtGender" runat="server" ></asp:TextBox>
        <asp:TextBox ID="txtParentName" runat="server" Width="150px"></asp:TextBox>  
        <asp:HiddenField runat="server" ID="hdnPatientId" />
        <asp:HiddenField runat="server" ID="hdnParentId" />
         <asp:HiddenField runat="server" ID="hdnProviderId" />
    </div>
</asp:content>

