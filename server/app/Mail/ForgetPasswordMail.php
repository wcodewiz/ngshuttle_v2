<?php

namespace App\Mail;

use App\Models\User;
use App\utils\ShopApp;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\HtmlString;

class ForgetPasswordMail extends Mailable
{
    use Queueable, SerializesModels;
    private string $link;
    private string $appName;
    private User $user;


    /**
     * Create a new message instance.
     */
    public function __construct(User $user,string $link)
    {
        $this->user=$user;
        $this->link=$link;
        $this->appName=ShopApp::appName();


    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "$this->appName Account Recovery",
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        $name=explode("@",$this->user->email)[0];

        return new Content(
            view: 'mail.mail',
            with:["subject"=>"$this->appName Account Recovery",
            "body"=>new HtmlString("Hello $name, <br>
            <h4 style='text-align:center;width:100%;'>Recover your account</h4>. <hr/>
            <p>It's seems you've lost your password!!</p><br>
            <article>This very few steps
            will help you,recover your account ,but if you did not request this.
            <sup><i>Please do nothing!!</i></sup> other wise ,
            click
            <a  style='display:block;margin-top:14px;
            background-color:green;color:#fff;padding:5px 45px;text-decoration:none;border-radius:5px;'
            href='$this->link'>Recover Account</a></article>"),]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}